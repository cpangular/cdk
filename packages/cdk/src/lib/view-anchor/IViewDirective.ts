import { EmbeddedViewRef } from "@angular/core";

export interface IViewDirective {
  removed(): void;
  added(to: string | symbol | undefined): void;
  viewRef: EmbeddedViewRef<any>;
}
