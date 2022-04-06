import { ElementRef, Injector } from '@angular/core';
import { isObservable, Subscription } from 'rxjs';
import { IElementRef } from './IElementRef';
import { IInjector } from './IInjector';

export interface IInjectorFieldName {
  injector: string;
}

export interface IElementFieldName {
  elementRef: string;
}

export type AttributeBindingAsyncConfig = { attributeName?: string } & (
  | IInjectorFieldName
  | IElementFieldName
  | (IInjectorFieldName & IElementFieldName)
);

export function AttributeBindingAsync(): (target: IInjector | IElementRef, propertyKey: string) => void;
export function AttributeBindingAsync(attributeName: string): (target: IInjector | IElementRef, propertyKey: string) => void;
export function AttributeBindingAsync(
  config: { attributeName?: string } & IElementFieldName
): (target: IInjector | any, propertyKey: string) => void;
export function AttributeBindingAsync(
  config: { attributeName?: string } & IInjectorFieldName
): (target: IElementRef | any, propertyKey: string) => void;
export function AttributeBindingAsync(config?: string | AttributeBindingAsyncConfig) {
  return (target: IInjector | IElementRef, propertyKey: string) => {
    const cfg =
      typeof config === 'object'
        ? {
            attributeName: config.attributeName || propertyKey,
            injector: (config as IInjectorFieldName).injector ?? 'injector',
            elementRef: (config as IElementFieldName).elementRef ?? 'elementRef',
          }
        : {
            attributeName: config || propertyKey,
            injector: 'injector',
            elementRef: 'elementRef',
          };

    function setAttr(element: HTMLElement, v: any) {
      if (v === undefined || v === null) {
        element.removeAttribute(cfg.attributeName);
      } else {
        element.setAttribute(cfg.attributeName, v.toString());
      }
    }

    let value: any = undefined;
    let sub: Subscription = new Subscription();
    Object.defineProperty(target, propertyKey, {
      get: () => value,
      set: function (this: IInjector | IElementRef, v: any) {
        sub.unsubscribe();
        value = v;

        const elementRef = (this as any)[cfg.elementRef] as ElementRef;
        const injector = (this as any)[cfg.injector] as Injector;
        const elm = elementRef instanceof ElementRef ? elementRef.nativeElement : injector.get(ElementRef).nativeElement;
        if (!isObservable(v)) {
          setAttr(elm, v);
        } else {
          sub = v.subscribe((val) => setAttr(elm, val));
        }
      },
    });
  };
}
