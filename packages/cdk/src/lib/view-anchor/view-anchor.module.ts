import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AnchorViewToDirective } from "./anchor-view-to.directive";
import { HideWhenNoViewsDirective } from "./hide-when-no-views.directive";
import { IfAnchorHasViewsDirective } from "./if-anchor-has-views.directive";
import { ViewAnchorDirective } from "./view-achor.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    ViewAnchorDirective,
    AnchorViewToDirective,
    HideWhenNoViewsDirective,
    IfAnchorHasViewsDirective,
  ],
  exports: [
    ViewAnchorDirective,
    AnchorViewToDirective,
    HideWhenNoViewsDirective,
    IfAnchorHasViewsDirective,
  ],
})
export class CpNgViewAnchorModule {}
