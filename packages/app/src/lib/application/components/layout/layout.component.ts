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

function hasElementRef(obj: any,): obj is IElementRef {
  return obj.elementRef instanceof ElementRef;
}

function hasInjector(obj: any): obj is IInjector {
  return obj.injector instanceof Injector;
}

interface IInjectorFieldName{
  injector:string;
}

interface IElementFieldName{
  elementRef:string;
}

type AttributeBindingAsyncConfig = {attributeName?:string} & (IInjectorFieldName | IElementFieldName | (IInjectorFieldName & IElementFieldName));

function AttributeBindingAsync(): (target:IInjector | IElementRef, propertyKey: string) => void;
function AttributeBindingAsync(attributeName: string): (target:IInjector | IElementRef, propertyKey: string) => void;
function AttributeBindingAsync(config:{attributeName?:string} & IElementFieldName): (target:IInjector | any, propertyKey: string) => void;
function AttributeBindingAsync(config:{attributeName?:string} & IInjectorFieldName): (target:IElementRef | any, propertyKey: string) => void;
function AttributeBindingAsync(config?: string | AttributeBindingAsyncConfig) {

  return (target: IInjector | IElementRef, propertyKey: string) => {
    const cfg = typeof config === 'object' ? {
      attributeName: config.attributeName || propertyKey,
      injector: (config as IInjectorFieldName).injector ?? 'injector',
      elementRef: (config as IElementFieldName).elementRef ?? 'elementRef'
    } : {
      attributeName: config || propertyKey,
      injector: 'injector',
      elementRef: 'elementRef'
    }

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
          return this.regions.fixed.left;
        } else {
          return this.regions.fixedOverlay.left;
        }
      } else {
        return this.regions.scroll.left;
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
  @AttributeBindingAsync('show-menu-button-start')
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
          return fixed ? 2 : 1;
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
          return this.regions.fixed.right;
        } else {
          return this.regions.fixedOverlay.right;
        }
      } else {
        return this.regions.scroll.right;
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
          return fixed ? 2 : 1;
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

  // Overlay Visibility //
  public readonly showOverlayTop$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.overlay.top),
  ]);
  public readonly showOverlayLeft$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.overlay.left),
  ]);
  public readonly showOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.overlay.bottom),
  ]);
  public readonly showOverlayRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.overlay.right),
  ]);

  // Fixed Visibility //
  public readonly showFixedTop$ = anyTrue$([
    this.headerScroll.fixed$,
    this.noticeStartScroll.fixed$,
    this.viewAnchorService.hasViewChange(this.regions.fixed.top),
  ]);
  public readonly showFixedLeft$ = anyTrue$([
    this.menuStartWhere$.pipe(map((v) => v === this.regions.fixed.left)),
    this.viewAnchorService.hasViewChange(this.regions.fixed.left),
  ]);
  public readonly showFixedBottom$ = anyTrue$([
    this.footerScroll.fixed$,
    this.noticeEndScroll.fixed$,
    this.viewAnchorService.hasViewChange(this.regions.fixed.bottom),
  ]);
  public readonly showFixedRight$ = anyTrue$([
    this.menuEndWhere$.pipe(map((v) => v === this.regions.fixed.right)),
    this.viewAnchorService.hasViewChange(this.regions.fixed.right),
  ]);

  // Fixed Overlay Visibility //
  public readonly showFixedOverlayTop$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.fixedOverlay.top),
  ]);
  public readonly showFixedOverlayLeft$ = anyTrue$([
    this.menuStartWhere$.pipe(map((v) => v === this.regions.fixedOverlay.left)),
    this.viewAnchorService.hasViewChange(this.regions.fixedOverlay.left),
  ]);
  public readonly showFixedOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.fixedOverlay.bottom),
  ]);
  public readonly showFixedOverlayRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.fixedOverlay.right),
  ]);

  // Scroll Visibility //
  public readonly showScrollTop$ = anyTrue$([
    not$(this.headerScroll.fixed$),
    not$(this.noticeStartScroll.fixed$),
    this.viewAnchorService.hasViewChange(this.regions.scroll.top),
  ]);
  public readonly showScrollLeft$ = anyTrue$([
    this.menuStartWhere$.pipe(map((v) => v === this.regions.scroll.left)),
    this.viewAnchorService.hasViewChange(this.regions.scroll.left),
  ]);
  public readonly showScrollBottom$ = anyTrue$([
    not$(this.footerScroll.fixed$),
    not$(this.noticeEndScroll.fixed$),
    this.viewAnchorService.hasViewChange(this.regions.scroll.bottom),
  ]);
  public readonly showScrollRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.scroll.right),
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
      distinctUntilChanged()
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
