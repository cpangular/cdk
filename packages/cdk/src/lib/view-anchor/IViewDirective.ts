import { EmbeddedViewRef, TemplateRef } from '@angular/core';

export interface IViewDirective<T = any> {
  removed(): void;
  added(to: string | symbol | undefined): void;
  getViewNodes(): Element[];
  templateRef?: TemplateRef<T>;
}
