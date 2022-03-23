import { CdkScrollable } from "@angular/cdk/scrolling";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { observe } from "@cpangular/cdk/value-resolver";
import { ViewAnchorService } from "@cpangular/cdk/view-anchor";
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  isObservable,
  map,
  Observable,
  of,
  pairwise,
  shareReplay,
  Subject,
  Subscription,
  tap,
  throttleTime,
} from "rxjs";
import { IApplicationConfiguration } from "../../config/ApplicationConfiguration";
import { FinalApplicationConfiguration } from "../../config/FinalApplicationConfiguration";
import { MenuAnchors } from "../menu-base/MenuAnchors";
import { LayerSizes } from "./layer/layer.component";
import { LayoutRegions } from "./LayoutRegions";
import { MenuMode } from "./MenuMode";
import { ScrollBehavior } from "./ScrollBehavior";

export class ScrollBehaviorWatcher {
  public readonly fixed$ = this.mode$.pipe(
    map((m) => m !== ScrollBehavior.SCROLL),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly hideOnScroll$ = this.mode$.pipe(
    map((m) => m === ScrollBehavior.FLOAT),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(public readonly mode$: Observable<ScrollBehavior>) {}
}

function anyTrue$(conditions: Observable<boolean>[]) {
  return combineLatest(conditions).pipe(
    map((c) => c.some((v) => v === true)),
    distinctUntilChanged(),
    shareReplay(1)
  );
}

function not$(obs: Observable<boolean>): Observable<boolean> {
  return obs.pipe(map((v) => !v));
}

interface IInjector {
  readonly injector: Injector;
}

interface IElementRef<T = any> {
  readonly elementRef: ElementRef<T>;
}

function hasElementRef(obj: any): obj is IElementRef {
  return obj.elementRef instanceof ElementRef;
}

function hasInjector(obj: any): obj is IInjector {
  return obj.injector instanceof Injector;
}

interface IInjectorFieldName {
  injector: string;
}

interface IElementFieldName {
  elementRef: string;
}

type AttributeBindingAsyncConfig = { attributeName?: string } & (
  | IInjectorFieldName
  | IElementFieldName
  | (IInjectorFieldName & IElementFieldName)
);

function AttributeBindingAsync(): (
  target: IInjector | IElementRef,
  propertyKey: string
) => void;
function AttributeBindingAsync(
  attributeName: string
): (target: IInjector | IElementRef, propertyKey: string) => void;
function AttributeBindingAsync(
  config: { attributeName?: string } & IElementFieldName
): (target: IInjector | any, propertyKey: string) => void;
function AttributeBindingAsync(
  config: { attributeName?: string } & IInjectorFieldName
): (target: IElementRef | any, propertyKey: string) => void;
function AttributeBindingAsync(config?: string | AttributeBindingAsyncConfig) {
  return (target: IInjector | IElementRef, propertyKey: string) => {
    const cfg =
      typeof config === "object"
        ? {
            attributeName: config.attributeName || propertyKey,
            injector: (config as IInjectorFieldName).injector ?? "injector",
            elementRef:
              (config as IElementFieldName).elementRef ?? "elementRef",
          }
        : {
            attributeName: config || propertyKey,
            injector: "injector",
            elementRef: "elementRef",
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
        const elm =
          elementRef instanceof ElementRef
            ? elementRef.nativeElement
            : injector.get(ElementRef).nativeElement;
        if (!isObservable(v)) {
          setAttr(elm, v);
        } else {
          sub = v.subscribe((val) => setAttr(elm, val));
        }
      },
    });
  };
}

@Component({
  selector: "cpng-app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  regions = LayoutRegions;
  menuAnchors = MenuAnchors;

  public readonly headerScroll = new ScrollBehaviorWatcher(
    observe(this.config.header.scrollBehavior!)
  );

  public readonly footerScroll = new ScrollBehaviorWatcher(
    observe(this.config.layout.footerScrollBehavior!)
  );

  public readonly rightToLeft$ = observe(this.config.layout.rightToLeft);

  public menuStartMode$ = observe(this.config.menuStart.mode);
  public readonly menuStartScroll = new ScrollBehaviorWatcher(
    observe(this.config.menuStart.scrollBehavior!)
  );

  public menuStartWhere$ = combineLatest([
    this.menuStartScroll.fixed$,
    this.menuStartMode$,
  ]).pipe(
    map(([fixed, mode]) => {
      if (fixed) {
        if (mode === MenuMode.FIXED || mode === MenuMode.SLIDE) {
          return this.regions.application.base.left;
        } else {
          return this.regions.scroll.overlay.left;
        }
      } else {
        if(mode === MenuMode.OVER || mode === MenuMode.PUSH){
          return this.regions.scroll.overlay.left;
        }
        return this.regions.scroll.base.left;
      }
    }),
    tap((v) => {
      console.log("menuStartWhere$", this);
    })
  );

  /*@AttributeBindingAsync({
    attributeName: "show-menu-button-start",
    elementRef: 'elmRef'
  })*/
  @AttributeBindingAsync("show-menu-button-start")
  public menuButtonStartShow$ = combineLatest([this.menuStartMode$]).pipe(
    map(([mode]) => {
      if (mode === MenuMode.FIXED) {
        return false;
      }
      return true;
    })
  );

  private _menuStartOpened$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get menuStartOpened(): boolean {
    return this._menuStartOpened$.value;
  }

  public set menuStartOpened(value: boolean) {
    this._menuStartOpened$.next(value);
  }

  public menuStartModal$ = combineLatest([
    this.menuStartMode$,
    this.menuStartScroll.fixed$,
    this._menuStartOpened$,
  ]).pipe(
    map(([mode, fixed, opened]) => {
      if (!opened) return 0;
      switch (mode) {
        case MenuMode.OVER:
        case MenuMode.PUSH:
          return 2;
        default:
          return 0;
      }
    }),
    distinctUntilChanged()
  );

  public menuEndMode$ = observe(this.config.menuStart.mode);
  public readonly menuEndScroll = new ScrollBehaviorWatcher(
    observe(this.config.layout.menuEndScrollBehavior!)
  );
  public menuEndWhere$ = combineLatest([
    this.menuEndScroll.fixed$,
    this.menuEndMode$,
  ]).pipe(
    map(([fixed, mode]) => {
      if (fixed) {
        if (mode === MenuMode.FIXED || mode === MenuMode.SLIDE) {
          return this.regions.application.base.right;
        } else {
          return this.regions.application.overlay.right;
        }
      } else {
        return this.regions.scroll.base.right;
      }
    })
  );

  public menuButtonEndShow$ = combineLatest([this.menuStartMode$]).pipe(
    map(([mode]) => {
      if (mode === MenuMode.FIXED) {
        return false;
      }
      return true;
    })
  );

  private _menuEndOpened$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get menuEndOpened(): boolean {
    return this._menuEndOpened$.value;
  }

  public set menuEndOpened(value: boolean) {
    this._menuEndOpened$.next(value);
  }

  public menuEndModal$ = combineLatest([
    this.menuEndMode$,
    this.menuEndScroll.fixed$,
    this._menuEndOpened$,
  ]).pipe(
    map(([mode, fixed, opened]) => {
      if (!opened) return 0;
      switch (mode) {
        case MenuMode.OVER:
        case MenuMode.PUSH:
          return 2;
        default:
          return 0;
      }
    }),
    distinctUntilChanged()
  );

  public modal$ = combineLatest([
    this.menuStartModal$,
    this.menuEndModal$,
  ]).pipe(
    map(([s, e]) => Math.max(s, e)),
    distinctUntilChanged(),
    tap((v) => {
      this._modal = v;
    })
  );

  private _modal: number = 0;

  @HostBinding("attr.modal")
  public get modal() {
    return this._modal;
  }

  public modalClicked$ = new Subject<MouseEvent>();

  public readonly noticeStartScroll = new ScrollBehaviorWatcher(
    observe(ScrollBehavior.FIXED)
  );
  public readonly noticeEndScroll = new ScrollBehaviorWatcher(
    observe(ScrollBehavior.FIXED)
  );

  // Viewport Overlay Visibility //
  public readonly hasViewportOverlayTop$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.top),
  ]);

  public readonly hasViewportOverlayLeft$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.left),
  ]);
  public readonly hasViewportOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.bottom),
  ]);
  public readonly hasViewportOverlayRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.right),
  ]);
  public readonly hasViewportOverlayCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.center),
  ]);

  // Viewport Visibility //
  public readonly hasViewportTop$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.base.top),
  ]);

  public readonly hasViewportLeft$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.base.left),
  ]);
  public readonly hasViewportBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.base.bottom),
  ]);
  public readonly hasViewportRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.base.right),
  ]);
  public readonly hasViewportCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.base.center),
  ]);

  // Application Overlay Visibility //
  public readonly hasApplicationOverlayTop$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.application.overlay.top),
  ]);

  public readonly hasApplicationOverlayLeft$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.application.overlay.left),
  ]);
  public readonly hasApplicationOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(
      this.regions.application.overlay.bottom
    ),
  ]);
  public readonly hasApplicationOverlayRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(
      this.regions.application.overlay.right
    ),
  ]);
  public readonly hasApplicationOverlayCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(
      this.regions.application.overlay.center
    ),
  ]);

  // Application Visibility //
  public readonly hasApplicationTop$ = anyTrue$([
    this.headerScroll.fixed$,
    this.noticeStartScroll.fixed$,
    this.viewAnchorService.hasViewChange(this.regions.application.base.top),
  ]);

  public readonly hasApplicationLeft$ = anyTrue$([
    this.menuStartWhere$.pipe(map((v) => v === this.regions.application.base.left)),
    this.viewAnchorService.hasViewChange(this.regions.application.base.left),
  ]);
  public readonly hasApplicationBottom$ = anyTrue$([
    this.footerScroll.fixed$,
    this.noticeEndScroll.fixed$,
    this.viewAnchorService.hasViewChange(this.regions.application.base.bottom),
  ]);
  public readonly hasApplicationRight$ = anyTrue$([
    this.menuEndWhere$.pipe(map((v) => v === this.regions.application.base.right)),
    this.viewAnchorService.hasViewChange(this.regions.application.base.right),
  ]);
  public readonly hasApplicationCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.application.base.center),
  ]);


  // Scroll Overlay Visibility //
  public readonly hasScrollOverlayTop$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.scroll.overlay.top),
  ]);

  public readonly hasScrollOverlayLeft$ = anyTrue$([
    this.menuStartWhere$.pipe(map((v) => v === this.regions.scroll.overlay.left)),
    this.viewAnchorService.hasViewChange(this.regions.scroll.overlay.left),
  ]);
  public readonly hasScrollOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(
      this.regions.scroll.overlay.bottom
    ),
  ]);
  public readonly hasScrollOverlayRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(
      this.regions.scroll.overlay.right
    ),
  ]);
  public readonly hasScrollOverlayCenter$ = anyTrue$([
    this.modal$.pipe(map(v => v === 2)),
    this.viewAnchorService.hasViewChange(
      this.regions.scroll.overlay.center
    ),
  ]);

  // Scroll Visibility //
  public readonly hasScrollTop$ = anyTrue$([
    this.headerScroll.fixed$,
    this.noticeStartScroll.fixed$,
    this.viewAnchorService.hasViewChange(this.regions.scroll.base.top),
  ]);

  public readonly hasScrollLeft$ = anyTrue$([
    this.menuStartWhere$.pipe(map((v) => v === this.regions.scroll.base.left)),
    this.viewAnchorService.hasViewChange(this.regions.scroll.base.left),
  ]);
  public readonly hasScrollBottom$ = anyTrue$([
    this.footerScroll.fixed$,
    this.noticeEndScroll.fixed$,
    this.viewAnchorService.hasViewChange(this.regions.scroll.base.bottom),
  ]);
  public readonly hasScrollRight$ = anyTrue$([
    this.menuEndWhere$.pipe(map((v) => v === this.regions.scroll.base.right)),
    this.viewAnchorService.hasViewChange(this.regions.scroll.base.right),
  ]);
  public readonly hasScrollCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.scroll.base.center),
  ]);

  @ViewChild(CdkScrollable, { static: true })
  private scrollContainer!: CdkScrollable;
  private scrollHide$?: Observable<boolean>;

  constructor(
    @Inject(FinalApplicationConfiguration)
    private readonly config: IApplicationConfiguration,
    public readonly elementRef: ElementRef<HTMLElement>,
    public readonly viewAnchorService: ViewAnchorService,
    private readonly changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
     this.scrollHide$ = this.scrollContainer.elementScrolled().pipe(
      throttleTime(100, undefined, { leading: true, trailing: true }),
      map((evt) => this.scrollContainer.measureScrollOffset("top")),
      pairwise(),
      map(([prev, next]) =>
        next <= 128 ? Number.MIN_SAFE_INTEGER : next - prev
      ),
      filter((d) => Math.abs(d) > 80),
      map((d) => d > 0),
      distinctUntilChanged(),
      tap(console.log)
    );

    this.scrollHide$.subscribe((hide) =>
      hide
        ? this.elementRef.nativeElement.classList.add("scroll-hide")
        : this.elementRef.nativeElement.classList.remove("scroll-hide")
    );

    this.modalClicked$.subscribe((v) => {
      if (this.menuStartOpened) {
        this.menuStartOpened = false;
      }
      if (this.menuEndOpened) {
        this.menuEndOpened = false;
      }
    });
    this.changeRef.detectChanges();
  }

  _handleFixedLayerResize(sizes: LayerSizes) {
    this.setInsetProperties(this.elementRef.nativeElement, sizes);
  }

  setInsetProperties(elm: HTMLElement, sizes: LayerSizes, prefix?: string) {
    elm.style.setProperty(
      `--${prefix ? `${prefix}-` : ""}top`,
      `${sizes.top.height}px`
    );
    elm.style.setProperty(
      `--${prefix ? `${prefix}-` : ""}left`,
      `${sizes.left.width}px`
    );
    elm.style.setProperty(
      `--${prefix ? `${prefix}-` : ""}bottom`,
      `${sizes.bottom.height}px`
    );
    elm.style.setProperty(
      `--${prefix ? `${prefix}-` : ""}right`,
      `${sizes.right.width}px`
    );
  }
}
