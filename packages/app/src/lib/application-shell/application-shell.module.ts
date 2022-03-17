import { ObserversModule } from "@angular/cdk/observers";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { BreakpointResolverModule } from "@cpangular/cdk/breakpoint-resolver";
import { CpNgDrawerModule } from "@cpangular/cdk/drawer";
import { ResizeModule } from "@cpangular/cdk/resize";
import { CpNgViewAnchorModule, ViewAnchorService } from "@cpangular/cdk/view-anchor";
import { ApplicationShellComponent } from "./application-shell.component";
import { ApplicationHeaderComponent } from "./components/application-header/application-header.component";
import { ApplicationLayoutComponent } from "./components/application-layout/application-layout.component";
import { PanelWrapperComponent } from "./components/panel-wrapper/panel-wrapper.component";
import { ApplicationMenuComponent } from './components/application-menu/application-menu.component';
import { AuthenticationModule } from "@cpangular/app/auth";

@NgModule({
  declarations: [
    ApplicationShellComponent,
    ApplicationHeaderComponent,
    PanelWrapperComponent,
    ApplicationLayoutComponent,
    ApplicationMenuComponent,
  ],
  exports: [ApplicationShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    CpNgDrawerModule,
    CpNgViewAnchorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    BreakpointResolverModule,
    ObserversModule,
    ResizeModule,
    AuthenticationModule
  ],
  providers: []
})
export class ApplicationShellModule {}
