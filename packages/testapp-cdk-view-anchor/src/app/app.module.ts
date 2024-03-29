import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationModule } from '@cpangular/app/application';
import { AuthenticationState } from '@cpangular/app/auth';
import { BreakpointResolverModule } from '@cpangular/cdk/breakpoint-resolver';
import { CpNgDrawerModule } from '@cpangular/cdk/drawer';
import { CpNgViewAnchorModule } from '@cpangular/cdk/view-anchor';
import { NgxsModule } from '@ngxs/store';
import { OIDCAuthenticationModule } from 'packages/app/src/lib/auth-oidc/oidc-authentication.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { MaterialDynamicThemingModule } from '@cpangular/material-dynamic-theming';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreakpointResolverModule,
    CpNgViewAnchorModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CpNgDrawerModule,
    ApplicationModule,
    MatListModule,
    MatMenuModule,
    OIDCAuthenticationModule.forRoot(environment.openIdConfig),
    NgxsModule.forRoot([AuthenticationState], {
      developmentMode: !environment.production,
    }),
    environment.ngxsPluginImports,
  ],
  providers: [environment.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
