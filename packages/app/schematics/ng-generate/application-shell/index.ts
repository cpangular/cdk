import { template as interpolateTemplate } from "@angular-devkit/core";
import { chain, Rule, Tree } from "@angular-devkit/schematics";
import {
  addModuleImportToModule, findModuleFromOptions
} from "@angular/cdk/schematics";
import { readFileSync } from "fs";
import { dirname, join } from 'path';
import { Schema } from "./schema";


export default function (options: Schema): Rule {
  return chain([
    addAppShellModulesToModule(options),
    addAppShellHtmlToTemplate(options),
  ]);
}

function addAppShellHtmlToTemplate(options: Schema) {
  return async (host: Tree) => {
    const modulePath = dirname((await findModuleFromOptions(host, {
      name: "AppModule",
    }))!);
    
    const appComponentPath = `${modulePath}/app.component`;
    const appComponentPathTS = `${appComponentPath}.ts`;
    const appComponentPathHtml = `${appComponentPath}.html`;
    if(host.exists(appComponentPathHtml)){
      const fileContent = readFileSync(
        join(__dirname, "files/app.component.html.template"),
        "utf8"
      );

      const hasRouting = host.exists(`${modulePath}/app-routing.module.ts`);
      const templateContext = {
        routerOutletTag: hasRouting ? '<router-outlet></router-outlet>' : ''
      }

      const tpl = interpolateTemplate(fileContent)(templateContext);
      const update = host.beginUpdate(appComponentPathHtml);
      update.insertLeft(0, tpl);
      host.commitUpdate(update);

    }
  };
}

function addAppShellModulesToModule(options: Schema) {
  return async (host: Tree) => {
    const modulePath = (await findModuleFromOptions(host, {
      name: "AppModule",
    }))!;
    addModuleImportToModule(
      host,
      modulePath,
      "ApplicationShellModule",
      "@cpangular/app/application-shell"
    );
    addModuleImportToModule(
      host,
      modulePath,
      "CpNgDynamicMaterialThemingModule",
      "@cpangular/material-dynamic-theming/dynamic"
    );
  };
}
