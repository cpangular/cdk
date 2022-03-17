import { Configuration } from "@cpangular/app/auth-oidc";

export const environment = {
  production: true,
  ngxsPluginImports: [],
  providers: [],
  openIdConfig: {
    authority: "https://identityserver",
    clientId: "ng.test",
    responseType: "code",
    redirectUrl: "https://localhost:4200/oidc-renew.html",
    postLogoutRedirectUri: "https://localhost:4200/oidc-logout.html",
    //silentRenew: true,
    showDebugInformation: true,
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
