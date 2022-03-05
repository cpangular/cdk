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
import { CpNgViewAnchorModule } from "@cpangular/cdk/view-anchor";
import { ApplicationShellComponent } from "./application-shell.component";
import { ApplicationHeaderComponent } from "./components/application-header/application-header.component";
@NgModule({
  declarations: [ApplicationShellComponent, ApplicationHeaderComponent],
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
  ],
})
export class ApplicationShellModule {}
