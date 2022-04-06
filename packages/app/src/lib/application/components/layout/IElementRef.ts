import { ElementRef } from '@angular/core';

export interface IElementRef<T = any> {
  readonly elementRef: ElementRef<T>;
}

export function hasElementRef(obj: any): obj is IElementRef {
  return obj.elementRef instanceof ElementRef;
}
