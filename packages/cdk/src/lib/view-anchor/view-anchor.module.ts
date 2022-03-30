import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectToAnchorDirective } from './project-to-anchor.directive';
import { HideWhenNoViewsDirective } from './hide-when-no-views.directive';
import { IfAnchorHasViewsDirective } from './if-anchor-has-views.directive';
import { ViewAnchorDirective } from './view-achor.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewAnchorDirective, ProjectToAnchorDirective, HideWhenNoViewsDirective, IfAnchorHasViewsDirective],
  exports: [ViewAnchorDirective, ProjectToAnchorDirective, HideWhenNoViewsDirective, IfAnchorHasViewsDirective],
})
export class CpNgViewAnchorModule {}
