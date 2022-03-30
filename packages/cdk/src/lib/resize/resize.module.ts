import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeDirective } from './resize.directive';

@NgModule({
  declarations: [ResizeDirective],
  exports: [ResizeDirective],
  imports: [CommonModule],
})
export class ResizeModule {}
