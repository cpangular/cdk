import { HttpClient } from "@angular/common/http";
import {
  OpenIdConfiguration,
  StsConfigHttpLoader,
} from "angular-auth-oidc-client";
import { map, Observable, of } from "rxjs";
import { DefaultConfig } from "./defaultConfig";

export function loadConfigs(configs: Array<string | OpenIdConfiguration>) {
  return function loadConfigs(httpClient: HttpClient) {
    const loaders: Observable<OpenIdConfiguration>[] = configs.map((cfg) => {
      let obs: Observable<OpenIdConfiguration> =
        typeof cfg === "object"
          ? of(cfg)
          : httpClient.get<OpenIdConfiguration>(cfg).pipe();
      return obs.pipe(map(c => ({...DefaultConfig, ...c})));
    });
    return new StsConfigHttpLoader(loaders);
  };
}
