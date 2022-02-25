import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CpNgViewAnchorModule } from "@cpangular/cdk/view-anchor";
import {  BreakpointResolverModule } from "@cpangular/cdk/breakpoint-resolver";
import { CpNgDrawerModule } from "@cpangular/cdk/drawer";
import { ApplicationShellModule, APPLICATION_SHELL_CONFIG, ApplicationShellConfig, HeaderMode } from "@cpangular/app/application-shell";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { match } from '@cpangular/cdk/breakpoint-resolver';


@NgModule({
  declarations: [
    AppComponent
  ],
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
    ApplicationShellModule
  ],
  providers: [
    {
      provide: APPLICATION_SHELL_CONFIG,
      useValue: {
        rightMenuButtonColor: 'accent',
        headerMode: match('(max-height: 1000px)', HeaderMode.SCROLL_AWAY).default(HeaderMode.ALWAYS)
      } as Partial<ApplicationShellConfig>
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
