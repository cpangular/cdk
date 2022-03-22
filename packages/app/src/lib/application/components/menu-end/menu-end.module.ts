import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CpNgViewAnchorModule } from "@cpangular/cdk/view-anchor";
import { ApplicationMenuEndComponent } from "./menu-end.component";

@NgModule({
  declarations: [ApplicationMenuEndComponent],
  imports: [CommonModule,CpNgViewAnchorModule],
  exports: [ApplicationMenuEndComponent],
})
export class ApplicationMenuEndModule {}
