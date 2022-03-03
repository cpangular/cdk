import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";
import { noop } from "rxjs";
import { Schema } from "./schema";


/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @cpangular/material-dynamic-theming`.
 *
 * Since the Angular Material schematics depend on the schematic utility functions from the CDK,
 * we need to install the CDK before loading the schematic files that import from the CDK.
 */
export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {

    return chain([
      externalSchematic("@cpangular/material-dynamic-theming", "ng-add", {
        project: options.project,
      }),
    ]);
    
  };
}
