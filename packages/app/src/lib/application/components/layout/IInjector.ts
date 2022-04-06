import { Injector } from '@angular/core';

export interface IInjector {
  readonly injector: Injector;
}
export function hasInjector(obj: any): obj is IInjector {
  return obj.injector instanceof Injector;
}
