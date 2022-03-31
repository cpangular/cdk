import { Configuration } from '@cpangular/app/auth-oidc';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LogLevel } from 'angular-auth-oidc-client';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  ngxsPluginImports: [NgxsReduxDevtoolsPluginModule.forRoot(), NgxsLoggerPluginModule.forRoot()],
  providers: [],
  openIdConfig: {
    authority: 'https://identityserver',
    clientId: 'ng.test',
    responseType: 'code',
    redirectUrl: 'https://localhost:4200/oidc-renew.html',
    postLogoutRedirectUri: 'https://localhost:4200/oidc-logout.html',
    showDebugInformation: true,
    logLevel: LogLevel.Warn,
    scope: 'openid customer',
    /*stsServer: 'https://identityserver',
      clientId: 'ng.test',
      responseType: 'code',
      redirectUrl: 'https://localhost:4200/oidc-renew.html',
      apiServer: 'https://api.idealsupply.com',
      scope: 'openid customer',
      startCheckSession: true,
      silentRenew: true,
    //  logLevel: LogLevel.Warn,
      postLoginRoute: '/',
      forbiddenRoute: '/forbidden',
      unauthorizedRoute: '/unauthorized',
      maxIdTokenIatOffsetAllowedInSeconds: 30,
      showDebugInformation: true*/
  } as Configuration,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
