import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageToPackageJson, getPackageVersionFromPackageJson } from '../util/package-config';
import { Schema } from './schema';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const cpAppVersionRange = getPackageVersionFromPackageJson(host, '@cpangular/app');
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');

    const materialVersionRange = getPackageVersionFromPackageJson(host, '@angular/material');
    if (materialVersionRange === null) {
      addPackageToPackageJson(host, '@angular/material', ngCoreVersionTag!);
    }

    const cpDTVersionRange = getPackageVersionFromPackageJson(host, '@cpangular/material-dynamic-theming');
    if (cpDTVersionRange === null) {
      addPackageToPackageJson(host, '@cpangular/material-dynamic-theming', cpAppVersionRange!);
    }

    const cpCDKVersionRange = getPackageVersionFromPackageJson(host, '@cpangular/cdk');
    if (cpCDKVersionRange === null) {
      addPackageToPackageJson(host, '@cpangular/cdk', cpAppVersionRange!);
    }

    const taskId = context.addTask(new NodePackageInstallTask());

    context.addTask(
      new RunSchematicTask('ng-add-setup', {
        project: options.project,
      }),
      [taskId]
    );
  };
}
