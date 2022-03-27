import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";

import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
} from "@angular/core";

import { combineLatest, merge, Subject, takeUntil, tap, filter } from "rxjs";
import { LayerComponent } from "../layer/layer.component";
import { LayoutComponent } from "../layout.component";

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
  selector: "div[layer-group]",
  templateUrl: "./layer-group.component.html",
  styleUrls: ["./layer-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerGroupComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @HostListener("click")
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
    this.contentClicked$.pipe(
      filter((v) => this.disabled || this.contentDisabled)
    ),
    this.innerOverlayClicked$.pipe(
      filter((v) => this.disabled || this.contentDisabled)
    )
  ).pipe(tap(console.log));

  public constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly layout: LayoutComponent
  ) {}

  @Input("layer-group")
  public layerGroup: string = "";

  public get innerOverlayClass() {
    return {
      [`${this.layerGroup}-inner-inset-padding`]: true,
    };
  }

  private _disabled: boolean = false;
  @Input()
  @HostBinding("attr.disabled")
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _contentDisabled: boolean = false;
  @Input()
  @HostBinding("attr.contentDisabled")
  public get contentDisabled(): boolean {
    return this._contentDisabled;
  }
  public set contentDisabled(value: BooleanInput) {
    this._contentDisabled = coerceBooleanProperty(value);
  }

  @ContentChild("top")
  public _topTemplate: TemplateRef<any> | null = null;
  @ContentChild("overlayTop")
  public _overlayTopTemplate: TemplateRef<any> | null = null;
  @ContentChild("innerOverlayTop")
  public _innerOverlayTopTemplate: TemplateRef<any> | null = null;

  @ContentChild("left")
  public _leftTemplate?: TemplateRef<any>;
  @ContentChild("overlayLeft")
  public _overlayLeftTemplate?: TemplateRef<any>;
  @ContentChild("innerOverlayLeft")
  public _innerOverlayLeftTemplate?: TemplateRef<any>;

  @ContentChild("bottom")
  public _bottomTemplate?: TemplateRef<any>;
  @ContentChild("overlayBottom")
  public _overlayBottomTemplate?: TemplateRef<any>;
  @ContentChild("innerOverlayBottom")
  public _innerOverlayBottomTemplate?: TemplateRef<any>;

  @ContentChild("right")
  public _rightTemplate!: TemplateRef<any>;
  @ContentChild("overlayRight")
  public _overlayRightTemplate?: TemplateRef<any>;
  @ContentChild("innerOverlayRight")
  public _innerOverlayRightTemplate?: TemplateRef<any>;

  @ContentChild("overlayCenter")
  public _overlayCenterTemplate?: TemplateRef<any>;
  @ContentChild("innerOverlayCenter")
  public _innerOverlayCenterTemplate?: TemplateRef<any>;

  @ViewChildren(LayerComponent, { emitDistinctChangesOnly: true })
  private _layers?: QueryList<LayerComponent>;

  @Output()
  public resizeLayers = new EventEmitter();

  public get overlayLayer(): ILayer | undefined {
    return this._layers?.get(0);
  }
  public get contentLayer(): ILayer | undefined {
    return this._layers?.get(1);
  }
  public get innerOverlayLayer(): ILayer | undefined {
    return this._layers?.get(2);
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
    const a = combineLatest([
      this.overlayLayer!.layerResize,
      this.contentLayer!.layerResize,
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([overlaySizes, sizes]) => {
          
          const size = this.elementRef.nativeElement.getBoundingClientRect();
          this.elementRef.nativeElement.style.setProperty(`--content-top`, `${sizes.top.height}px`);
          this.elementRef.nativeElement.style.setProperty(`--content-left`, `${sizes.left.width}px`);
          this.elementRef.nativeElement.style.setProperty(`--content-bottom`, `${size.height - sizes.bottom.height}px`);
          this.elementRef.nativeElement.style.setProperty(`--content-right`, `${size.width - sizes.right.width}px`);

          const elm = this.layout.elementRef.nativeElement;
          if (elm) {
            const base = `--${this.layerGroup}`;
            let grp = ``;
            let prop = ``;

            if (this._overlayTopTemplate) {
              grp = `${base}-overlay-top`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${overlaySizes.top.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${overlaySizes.top.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${overlaySizes.top.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${overlaySizes.top.height}px`);
            }
            if (this._overlayLeftTemplate) {
              grp = `${base}-overlay-left`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${overlaySizes.left.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${overlaySizes.left.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${overlaySizes.left.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${overlaySizes.left.height}px`);
            }
            if (this._overlayBottomTemplate) {
              grp = `${base}-overlay-bottom`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${overlaySizes.bottom.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${overlaySizes.bottom.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${overlaySizes.bottom.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${overlaySizes.bottom.height}px`);
            }
            if (this._overlayRightTemplate) {
              grp = `${base}-overlay-right`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${overlaySizes.right.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${overlaySizes.right.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${overlaySizes.right.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${overlaySizes.right.height}px`);
            }
            if (this._topTemplate) {
              grp = `${base}-top`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${sizes.top.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${sizes.top.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${sizes.top.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${sizes.top.height}px`);
            }
            if (this._leftTemplate) {
              grp = `${base}-left`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${sizes.left.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${sizes.left.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${sizes.left.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${sizes.left.height}px`);
            }
            if (this._bottomTemplate) {
              grp = `${base}-bottom`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${sizes.bottom.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${sizes.bottom.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${sizes.bottom.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${sizes.bottom.height}px`);
            }
            if (this._rightTemplate) {
              grp = `${base}-right`;
              prop = `${grp}-top`;
              elm.style.setProperty(prop, `${sizes.right.top}px`);
              prop = `${grp}-left`;
              elm.style.setProperty(prop, `${sizes.right.left}px`);
              prop = `${grp}-width`;
              elm.style.setProperty(prop, `${sizes.right.width}px`);
              prop = `${grp}-height`;
              elm.style.setProperty(prop, `${sizes.right.height}px`);
            }
            grp = `${base}-center`;
            prop = `${grp}-top`;
            elm.style.setProperty(prop, `${sizes.rest.top}px`);
            prop = `${grp}-left`;
            elm.style.setProperty(prop, `${sizes.rest.left}px`);
            prop = `${grp}-width`;
            elm.style.setProperty(prop, `${sizes.rest.width}px`);
            prop = `${grp}-height`;
            elm.style.setProperty(prop, `${sizes.rest.height}px`);
          }
          //sizes.bottom
        })
      )
      .subscribe(this.resizeLayers);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
