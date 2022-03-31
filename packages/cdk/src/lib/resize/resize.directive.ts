import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { distinctUntilChanged, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ResizeObservable } from './resize-observable';

@Directive({
  selector: '[addSizeCssVars], [addSizeCssVarsToParent], [addSizeCssVarsToElement], [resize], [widthChange], [heightChange]',
  exportAs: 'resize',
})
export class ResizeDirective implements OnInit, OnDestroy {
  private _addSizeCssVars: boolean = false;
  private _addSizeCssVarsToParent: boolean = false;
  private _cssVarName: string = '';
  private _addSizeCssVarsToElement?: HTMLElement;
  private _destroy$: Subject<void> = new Subject();
  private _resize$: ResizeObservable;
  private _widthChange$: Observable<ResizeObserverEntry>;
  private _heightChange$: Observable<ResizeObserverEntry>;
  private _currentSize?: ResizeObserverEntry;

  @Input()
  public get addSizeCssVars() {
    return this._addSizeCssVars;
  }
  public set addSizeCssVars(value: BooleanInput) {
    this._addSizeCssVars = coerceBooleanProperty(value);
    this.removeCustomProperties(this.elmRef.nativeElement);
    if (this._currentSize) {
      this.setCustomProperties(this.elmRef.nativeElement, this._currentSize);
    }
  }
  @Input()
  public get addSizeCssVarsToParent() {
    return this._addSizeCssVarsToParent;
  }
  public set addSizeCssVarsToParent(value: BooleanInput) {
    this._addSizeCssVarsToParent = coerceBooleanProperty(value);
    this.removeCustomProperties(this.elmRef.nativeElement.parentElement, this._cssVarName);
    if (this._currentSize && this._cssVarName) {
      this.setCustomProperties(this.elmRef.nativeElement.parentElement, this._currentSize, this._cssVarName);
    }
  }

  @Input()
  public get addSizeCssVarsToElement() {
    return this._addSizeCssVarsToElement;
  }
  public set addSizeCssVarsToElement(value: HTMLElement | undefined) {
    this.removeCustomProperties(this._addSizeCssVarsToElement, this._cssVarName);
    if (this._currentSize && this._cssVarName) {
      this.setCustomProperties(value, this._currentSize, this._cssVarName);
    }
    this._addSizeCssVarsToElement = value;
  }

  @Input()
  public get cssVarName() {
    return this._cssVarName;
  }
  public set cssVarName(value: string) {
    this.removeCustomProperties(this._addSizeCssVarsToElement, this._cssVarName);
    this.removeCustomProperties(this.elmRef.nativeElement.parentElement, this._cssVarName);
    this._cssVarName = value;
    if (this._currentSize) {
      if (this._addSizeCssVarsToElement) {
        this.setCustomProperties(this._addSizeCssVarsToElement, this._currentSize, this._cssVarName);
      }
      if (this.addSizeCssVarsToParent) {
        this.setCustomProperties(this.elmRef.nativeElement.parentElement, this._currentSize, this._cssVarName);
      }
    }
  }

  @Output()
  public resize: EventEmitter<ResizeObserverEntry> = new EventEmitter();
  @Output()
  public widthChange: EventEmitter<ResizeObserverEntry> = new EventEmitter();
  @Output()
  public heightChange: EventEmitter<ResizeObserverEntry> = new EventEmitter();

  constructor(private readonly elmRef: ElementRef<HTMLElement>) {
    const element = elmRef.nativeElement;
    const box: ResizeObserverBoxOptions = 'content-box';
    this._resize$ = new ResizeObservable(element, box).pipe(
      tap((val) => (this._currentSize = val)),
      takeUntil(this._destroy$)
    );
    this._widthChange$ = this._resize$.pipe(distinctUntilChanged((a, b) => a.contentRect.width === b.contentRect.width));
    this._heightChange$ = this._resize$.pipe(distinctUntilChanged((a, b) => a.contentRect.height === b.contentRect.height));
  }

  ngOnInit(): void {
    this._resize$.subscribe(this.resize);
    this._widthChange$.subscribe(this.widthChange);
    this._heightChange$.subscribe(this.heightChange);
    if (this._addSizeCssVars) {
      const element = this.elmRef.nativeElement;
      this._resize$.subscribe({
        next: (val) => {
          this.setCustomProperties(element, val);
        },
      });
    }
    if (this._addSizeCssVarsToParent && this.cssVarName) {
      const element = this.elmRef.nativeElement;
      this._resize$.subscribe({
        next: (val) => {
          this.setCustomProperties(element.parentElement, val, this.cssVarName);
        },
      });
    }
    if (this._addSizeCssVarsToElement && this.cssVarName) {
      const element = this._addSizeCssVarsToElement;
      this._resize$.subscribe({
        next: (val) => {
          this.setCustomProperties(element, val, this.cssVarName);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    if (this._cssVarName) {
      this.removeCustomProperties(this.elmRef.nativeElement.parentElement, this._cssVarName);
      this.removeCustomProperties(this._addSizeCssVarsToElement, this._cssVarName);
    }
  }

  private setCustomProperties(element: HTMLElement | undefined | null, val: ResizeObserverEntry, prefix: string = '') {
    prefix = prefix ? `--${prefix}-` : `--`;
    element?.style.setProperty(`${prefix}width`, `${val.contentRect.width}px`);
    element?.style.setProperty(`${prefix}height`, `${val.contentRect.height}px`);

    const scrollbarWidth = this.elmRef.nativeElement.offsetWidth - this.elmRef.nativeElement.clientWidth;
    element?.style.setProperty(`${prefix}scrollbar`, `${scrollbarWidth}px`);
  }

  private removeCustomProperties(element: HTMLElement | undefined | null, prefix: string = '') {
    if (element) {
      prefix = prefix ? `--${prefix}-` : `--`;
      element.style.removeProperty(`${prefix}width`);
      element.style.removeProperty(`${prefix}height`);
      element.style.removeProperty(`${prefix}scrollbar`);
    }
  }
}
