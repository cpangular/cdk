import { chain, Rule, Tree } from "@angular-devkit/schematics";
import {dirname} from 'path';
import { Schema } from "./schema";
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
} from "@angular/cdk/schematics";

import {JSDOM} from 'jsdom'

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
    console.log("appComponentPathHtml", appComponentPathHtml);
    if(host.exists(appComponentPathHtml)){
        console.log("appComponentPathHtml exists");
    
        const dom = new JSDOM(host.read(appComponentPathHtml)!)
        const document = dom.window.document;
        const element = document.createElement('div');
    
        element.innerHTML = '<cpng-application-shell #shell></cpng-application-shell>';

        document.documentElement.insertBefore(element, null);
        host.overwrite(appComponentPathHtml, dom.serialize());
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
