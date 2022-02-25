
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ViewAnchorDirective } from "./view-achor.directive";
import { AnchorViewToDirective } from "./anchor-view-to.directive";
import { HideWhenNoViewsDirective } from "./hide-when-no-views.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [ViewAnchorDirective, AnchorViewToDirective, HideWhenNoViewsDirective],
  exports: [ViewAnchorDirective, AnchorViewToDirective, HideWhenNoViewsDirective],
})
export class CpNgViewAnchorModule {}
