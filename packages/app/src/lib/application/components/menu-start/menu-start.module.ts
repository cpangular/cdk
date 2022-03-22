import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ResizeModule } from "@cpangular/cdk/resize";
import { CpNgViewAnchorModule } from "@cpangular/cdk/view-anchor";
import { ApplicationMenuStartComponent } from "./menu-start.component";

@NgModule({
  declarations: [ApplicationMenuStartComponent],
  imports: [CommonModule, CpNgViewAnchorModule, MatButtonModule, MatIconModule, ResizeModule],
  exports: [ApplicationMenuStartComponent],
})
export class ApplicationMenuStartModule {}
