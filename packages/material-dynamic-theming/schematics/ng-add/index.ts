import { Schema } from "./schema";
import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @cpangular/material-dynamic-theming`.
 *
 * Since the Angular Material schematics depend on the schematic utility functions from the CDK,
 * we need to install the CDK before loading the schematic files that import from the CDK.
 */
 export default function (_: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        console.log('adding material-dynamic-theming');
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
 }