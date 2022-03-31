import { logging, template as interpolateTemplate } from '@angular-devkit/core';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { chain, noop, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { defaultTargetBuilders, getProjectFromWorkspace, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import { ProjectType } from '@schematics/angular/utility/workspace-models';
import { readFileSync } from 'fs';
import { join, normalize } from 'path';
import { Schema } from './schema';

const defaultCustomThemeFilename = 'theme.scss';

/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @cpangular/material-dynamic-theming`.
 *
 * Since the Angular Material schematics depend on the schematic utility functions from the CDK,
 * we need to install the CDK before loading the schematic files that import from the CDK.
 */
export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    if (project.extensions['projectType'] === ProjectType.Application) {
      const themeName = options.theme || 'indigo-pink';
      return themeName === 'custom'
        ? insertCustomTheme(options.project, host, context.logger)
        : insertPrebuiltTheme(options.project, themeName, context.logger);
    }
    return;
  };
}

async function insertCustomTheme(projectName: string, host: Tree, logger: logging.LoggerApi): Promise<Rule> {
  const workspace = await getWorkspace(host);
  const project = getProjectFromWorkspace(workspace, projectName);
  const stylesPath = getProjectStyleFile(project, 'scss');

  const themeContent = buildCustomThemeFromTemplate();

  if (!stylesPath) {
    if (!project.sourceRoot) {
      throw new SchematicsException(
        `Could not find source root for project: "${projectName}". ` +
          `Please make sure that the "sourceRoot" property is set in the workspace config.`
      );
    }
    const customThemePath = normalize(join(project.sourceRoot, defaultCustomThemeFilename));
    if (host.exists(customThemePath)) {
      logger.warn(`Cannot create a custom Material theme because ${customThemePath} already exists. Skipping custom theme generation.`);
      return noop();
    }
    host.create(customThemePath, themeContent);
    return addThemeStyleToTarget(projectName, 'build', customThemePath, logger);
  }

  const insertion = new InsertChange(stylesPath, 0, themeContent);
  const recorder = host.beginUpdate(stylesPath);

  recorder.insertLeft(insertion.pos, insertion.toAdd);
  host.commitUpdate(recorder);
  return noop();
}

function insertPrebuiltTheme(project: string, theme: string, logger: logging.LoggerApi): Rule {
  const themePath = `./node_modules/@cpangular/material-dynamic-theming/prebuilt-themes/${theme}.css`;

  return chain([addThemeStyleToTarget(project, 'build', themePath, logger), addThemeStyleToTarget(project, 'test', themePath, logger)]);
}

function addThemeStyleToTarget(projectName: string, targetName: 'test' | 'build', assetPath: string, logger: logging.LoggerApi): Rule {
  return updateWorkspace((workspace) => {
    const project = getProjectFromWorkspace(workspace, projectName);
    // Do not update the builder options in case the target does not use the default CLI builder.
    if (!validateDefaultTargetBuilder(project, targetName, logger)) {
      return;
    }

    const targetOptions = getProjectTargetOptions(project, targetName);
    const styles = targetOptions['styles'] as (string | { input: string })[];
    if (!styles) {
      targetOptions['styles'] = [assetPath];
    } else {
      const existingStyles = styles.map((s) => (typeof s === 'string' ? s : s.input));
      for (let [index, stylePath] of existingStyles.entries()) {
        // If the given asset is already specified in the styles, we don't need to do anything.
        if (stylePath === assetPath) {
          return;
        }
        // In case a prebuilt theme is already set up, we can safely replace the theme with the new
        // theme file. If a custom theme is set up, we are not able to safely replace the custom
        // theme because these files can contain custom styles, while prebuilt themes are
        // always packaged and considered replaceable.
        if (stylePath.includes(defaultCustomThemeFilename)) {
          logger.error(
            `Could not add the selected theme to the CLI project ` +
              `configuration because there is already a custom theme file referenced.`
          );
          logger.info(`Please manually add the following style file to your configuration:`);
          logger.info(`    ${assetPath}`);
          return;
        } //else if (stylePath.includes(prebuiltThemePathSegment)) {
        //styles.splice(index, 1);
        //}
      }

      styles.unshift(assetPath);
    }
  });
}

/**
 * Validates that the specified project target is configured with the default builders which are
 * provided by the Angular CLI. If the configured builder does not match the default builder,
 * this function can either throw or just show a warning.
 */
function validateDefaultTargetBuilder(project: ProjectDefinition, targetName: 'build' | 'test', logger: logging.LoggerApi) {
  const defaultBuilder = defaultTargetBuilders[targetName];
  const targetConfig = project.targets && project.targets.get(targetName);
  const isDefaultBuilder = targetConfig && targetConfig['builder'] === defaultBuilder;

  // Because the build setup for the Angular CLI can be customized by developers, we can't know
  // where to put the theme file in the workspace configuration if custom builders are being
  // used. In case the builder has been changed for the "build" target, we throw an error and
  // exit because setting up a theme is a primary goal of `ng-add`. Otherwise if just the "test"
  // builder has been changed, we warn because a theme is not mandatory for running tests
  // with Material. See: https://github.com/angular/components/issues/14176
  if (!isDefaultBuilder && targetName === 'build') {
    throw new SchematicsException(
      `Your project is not using the default builders for ` +
        `"${targetName}". The Angular Material schematics cannot add a theme to the workspace ` +
        `configuration if the builder has been changed.`
    );
  } else if (!isDefaultBuilder) {
    // for non-build targets we gracefully report the error without actually aborting the
    // setup schematic. This is because a theme is not mandatory for running tests.
    logger.warn(
      `Your project is not using the default builders for "${targetName}". This ` +
        `means that we cannot add the configured theme to the "${targetName}" target.`
    );
  }

  return isDefaultBuilder;
}

function buildCustomThemeFromTemplate() {
  const baseTemplateContext = {
    darkDefault: false,
  };
  const fileContent = readFileSync(join(__dirname, 'files/custom-theme.scss.template'), 'utf8');
  return interpolateTemplate(fileContent)(baseTemplateContext);
}
