import {
    chain,
    externalSchematic,
    Rule,
    SchematicContext,
    Tree
} from "@angular-devkit/schematics";
import { Schema } from "./schema";
  
  export default function (options: Schema): Rule {
    return async (host: Tree, context: SchematicContext) => {
     return chain([
        externalSchematic("@cpangular/material-dynamic-theming", "ng-add", {
          project: options.project,
        })
      ]);
    };
  }
  