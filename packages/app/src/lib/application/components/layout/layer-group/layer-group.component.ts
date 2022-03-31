import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { combineLatest, filter, map, merge, of, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { LayerComponent } from '../layer/layer.component';
import { LayoutComponent } from '../layout.component';

export interface LayerSizes {
  top: DOMRect;
  left: DOMRect;
  bottom: DOMRect;
  right: DOMRect;
  rest: DOMRect;
}

export interface ILayer {
  topOpened: boolean;
  topOpenedChange: EventEmitter<boolean>;
  leftOpened: boolean;
  leftOpenedChange: EventEmitter<boolean>;
  bottomOpened: boolean;
  bottomOpenedChange: EventEmitter<boolean>;
  rightOpened: boolean;
  rightOpenedChange: EventEmitter<boolean>;
  layerResize: EventEmitter<LayerSizes>;
  openAll(): void;
  closeAll(): void;
}

@Component({
  selector: 'div[layer-group]',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.scss'],
})
export class LayerGroupComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @HostListener('click')
  protected handleHostClick(evt: MouseEvent) {
    this.hostClicked$.next(evt);
  }

  @Output()
  public hostClicked$ = new Subject<MouseEvent>();
  @Output()
  public overlayClicked$ = new Subject<MouseEvent>();
  @Output()
  public contentClicked$ = new Subject<MouseEvent>();
  @Output()
  public innerOverlayClicked$ = new Subject<MouseEvent>();

  @Output()
  public disabledClicked$ = merge(
    this.hostClicked$.pipe(filter((v) => this.disabled)),
    this.contentClicked$.pipe(filter((v) => this.disabled || this.contentDisabled)),
    this.innerOverlayClicked$.pipe(filter((v) => this.disabled || this.contentDisabled))
  );

  public constructor(public readonly elementRef: ElementRef<HTMLElement>, private readonly layout: LayoutComponent) {}

  @Input('layer-group')
  public layerGroup: string = '';

  public get innerOverlayClass() {
    return {
      [`${this.layerGroup}-inner-inset-padding`]: true,
    };
  }

  private _disabled: boolean = false;
  @Input()
  @HostBinding('attr.disabled')
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _contentDisabled: boolean = false;
  @Input()
  @HostBinding('attr.contentDisabled')
  public get contentDisabled(): boolean {
    return this._contentDisabled;
  }
  public set contentDisabled(value: BooleanInput) {
    this._contentDisabled = coerceBooleanProperty(value);
  }

  @ContentChild('top')
  public _topTemplate: TemplateRef<any> | null = null;
  @ContentChild('overlayTop')
  public _overlayTopTemplate: TemplateRef<any> | null = null;
  @ContentChild('innerOverlayTop')
  public _innerOverlayTopTemplate: TemplateRef<any> | null = null;

  @ContentChild('left')
  public _leftTemplate?: TemplateRef<any>;
  @ContentChild('overlayLeft')
  public _overlayLeftTemplate?: TemplateRef<any>;
  @ContentChild('innerOverlayLeft')
  public _innerOverlayLeftTemplate?: TemplateRef<any>;

  @ContentChild('bottom')
  public _bottomTemplate?: TemplateRef<any>;
  @ContentChild('overlayBottom')
  public _overlayBottomTemplate?: TemplateRef<any>;
  @ContentChild('innerOverlayBottom')
  public _innerOverlayBottomTemplate?: TemplateRef<any>;

  @ContentChild('right')
  public _rightTemplate!: TemplateRef<any>;
  @ContentChild('overlayRight')
  public _overlayRightTemplate?: TemplateRef<any>;
  @ContentChild('innerOverlayRight')
  public _innerOverlayRightTemplate?: TemplateRef<any>;

  @ContentChild('overlayCenter')
  public _overlayCenterTemplate?: TemplateRef<any>;
  @ContentChild('innerOverlayCenter')
  public _innerOverlayCenterTemplate?: TemplateRef<any>;

  @ViewChildren(LayerComponent, { emitDistinctChangesOnly: true })
  private _layers?: QueryList<LayerComponent>;

  @Output()
  public resizeLayers = new EventEmitter();

  public get overlayLayer(): ILayer | undefined {
    return this._layers?.find((i) => i.layer === 'overlay');
  }
  public get contentLayer(): ILayer | undefined {
    return this._layers?.find((i) => i.layer === 'content');
  }
  public get innerOverlayLayer(): ILayer | undefined {
    return this._layers?.find((i) => i.layer === 'inner-overlay');
  }

  public closeOverlayLayer() {
    this.overlayLayer?.closeAll();
  }
  public closeInnerOverlayLayer() {
    this.innerOverlayLayer?.closeAll();
  }
  public openOverlayLayer() {
    this.overlayLayer?.openAll();
  }
  public openInnerOverlayLayer() {
    this.innerOverlayLayer?.openAll();
  }
  public closeBaseLayer() {
    this.contentLayer?.closeAll();
  }
  public openBaseLayer() {
    this.contentLayer?.openAll();
  }
  public closeAll() {
    this.closeBaseLayer();
    this.closeOverlayLayer();
    this.closeInnerOverlayLayer();
  }
  public openAll() {
    this.openBaseLayer();
    this.openOverlayLayer();
    this.openInnerOverlayLayer();
  }

  public ngAfterViewInit(): void {
    this._layers?.changes
      .pipe(
        startWith(undefined),
        takeUntil(this.destroy$),
        map((_) => this._layers),
        map((ql) => {
          var layers: (EventEmitter<LayerSizes> | undefined)[] = [undefined, undefined, undefined];
          ql?.forEach((layer) => {
            if (layer === this.overlayLayer) {
              layers[0] = layer.layerResize as EventEmitter<LayerSizes>;
            } else if (layer === this.contentLayer) {
              layers[1] = layer.layerResize as EventEmitter<LayerSizes>;
            } else {
              layers[2] = layer.layerResize as EventEmitter<LayerSizes>;
            }
          });
          return layers;
        }),

        switchMap((layers) => {
          return combineLatest(layers.map((l) => (l ? l : (of({} as LayerSizes) as EventEmitter<LayerSizes>))));
        }),

        tap(([overlaySizes, sizes, inlineOverlaySizes]) => {
          const size = this.elementRef.nativeElement.getBoundingClientRect();
          this.elementRef.nativeElement.style.setProperty(`--content-top`, `${sizes!.top.height}px`);
          this.elementRef.nativeElement.style.setProperty(`--content-left`, `${sizes!.left.width}px`);
          this.elementRef.nativeElement.style.setProperty(`--content-bottom`, `${size.height - sizes!.bottom.height}px`);
          this.elementRef.nativeElement.style.setProperty(`--content-right`, `${size.width - sizes!.right.width}px`);

          const elm = this.layout.elementRef.nativeElement;
          if (elm) {
            const base = `--${this.layerGroup}`;

            this.setDomRectProperties(elm, `${base}-overlay-top`, overlaySizes?.top);
            this.setDomRectProperties(elm, `${base}-overlay-left`, overlaySizes?.left);
            this.setDomRectProperties(elm, `${base}-overlay-bottom`, overlaySizes?.bottom);
            this.setDomRectProperties(elm, `${base}-overlay-right`, overlaySizes?.right);
            this.setDomRectProperties(elm, `${base}-overlay-center`, overlaySizes?.rest);

            this.setDomRectProperties(elm, `${base}-top`, sizes?.top);
            this.setDomRectProperties(elm, `${base}-left`, sizes?.left);
            this.setDomRectProperties(elm, `${base}-bottom`, sizes?.bottom);
            this.setDomRectProperties(elm, `${base}-right`, sizes?.right);
            this.setDomRectProperties(elm, `${base}-center`, sizes?.rest);
          }
        })
      )
      .subscribe(this.resizeLayers);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setDomRectProperties(elm: HTMLElement, prefix: string, domRect: DOMRect | undefined) {
    if (!domRect) {
      elm.style.removeProperty(`${prefix}-top`);
      elm.style.removeProperty(`${prefix}-left`);
      elm.style.removeProperty(`${prefix}-width`);
      elm.style.removeProperty(`${prefix}-height`);
    } else {
      elm.style.setProperty(`${prefix}-top`, `${domRect.top}px`);
      elm.style.setProperty(`${prefix}-left`, `${domRect.left}px`);
      elm.style.setProperty(`${prefix}-width`, `${domRect.width}px`);
      elm.style.setProperty(`${prefix}-height`, `${domRect.height}px`);
    }
  }
}
