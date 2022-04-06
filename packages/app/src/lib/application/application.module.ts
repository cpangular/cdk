import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CpNgViewAnchorModule } from '@cpangular/cdk/view-anchor';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { ApplicationLayoutModule } from './components/layout/layout.module';
import { Error403Component } from './pages/error403/error403.component';
import { Error404Component } from './pages/error404/error404.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { AuthenticationModule } from '@cpangular/app/auth';

@NgModule({
  declarations: [Error404Component, Error403Component, RedirectComponent, ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ApplicationLayoutModule,
    CpNgViewAnchorModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    AuthenticationModule,
  ],
  exports: [ApplicationComponent],
})
export class ApplicationModule {}
