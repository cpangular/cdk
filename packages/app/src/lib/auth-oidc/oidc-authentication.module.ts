import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import {
  AuthenticationModule,
  AuthenticationService,
} from "@cpangular/app/auth";
import { IFrameModule } from "@cpangular/cdk/iframe";
import { AuthModule, StsConfigLoader } from "angular-auth-oidc-client";
import { AuthIFrameComponent } from "./auth-iframe/auth-iframe.component";
import { Configuration } from "./config/Configuration";
import { loadConfigs } from "./config/loadConfigs";
import { OIDCAuthenticationService } from "./oidc-authentication.service";

@NgModule({
  declarations: [AuthIFrameComponent],
  imports: [CommonModule, AuthenticationModule, MatDialogModule, IFrameModule],
  providers: [
    {
      provide: AuthenticationService,
      useClass: OIDCAuthenticationService,
    },
  ],
})
export class OIDCAuthenticationModule {
  public static forRoot(
    configs: string | Configuration | Array<string | Configuration>
  ): ModuleWithProviders<any>[] {
    return [
      AuthModule.forRoot({
        loader: {
          provide: StsConfigLoader,
          useFactory: loadConfigs(Array.isArray(configs) ? configs : [configs]),
          deps: [HttpClient],
        },
      }),
      {
        ngModule: OIDCAuthenticationModule,
        providers: [],
      },
    ];
  }
}
