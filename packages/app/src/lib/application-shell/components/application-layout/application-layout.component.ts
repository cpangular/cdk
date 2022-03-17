import { CdkScrollable } from "@angular/cdk/scrolling";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { observe } from "@cpangular/cdk/value-resolver";
import { map, Subject, Subscription, takeUntil, throttleTime } from "rxjs";
import { ApplicationShellConfig } from "../../ApplicationShellConfig";
import { FINAL_APPLICATION_SHELL_CONFIG } from "../../FINAL_APPLICATION_SHELL_CONFIG";
import { ScrollBehavior } from "../../ScrollBehavior";
import { InternalApplicationLayoutViewAnchors } from "./InternalApplicationLayoutViewAnchors";

@Component({
  selector: "cpng-application-layout",
  templateUrl: "./application-layout.component.html",
  styleUrls: ["./application-layout.component.scss"],
})
export class ApplicationLayoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private _scrollContainer?: CdkScrollable;
  private _scrollContainerSub: Subscription = new Subscription();

  public anchors = InternalApplicationLayoutViewAnchors;

  @ViewChild("scrollContainer", { static: true, read: CdkScrollable })
  private get scrollContainer(): CdkScrollable | undefined {
    return this._scrollContainer;
  }
  private set scrollContainer(scroller: CdkScrollable | undefined) {
    if (this._scrollContainer !== scroller) {
      this._scrollContainerSub.unsubscribe();
      this._scrollContainer = scroller;
      if (scroller) {
        let currentPos = scroller.measureScrollOffset("top");
        let scrollHide = false;
        this._scrollContainerSub = scroller
          .elementScrolled()
          .pipe(
            takeUntil(this.destroy$),
            throttleTime(50, undefined, { trailing: true })
          )
          .subscribe((s) => {
            const pos = scroller.measureScrollOffset("top");
            const delta = pos - currentPos;

            if (pos <= 128) {
              scrollHide = false;
            } else if (delta >= 60) {
              scrollHide = true;
            } else if (delta <= -60) {
              scrollHide = false;
            }

            scrollHide
              ? this._elementRef.nativeElement.classList.add("scroll-hide")
              : this._elementRef.nativeElement.classList.remove("scroll-hide");

            currentPos = pos;
          });
      }
    }
  }

  public noticeScrollBehavior$ = observe(this._config.noticeScrollBehavior);
  public noticeHideOnScroll$ = this.noticeScrollBehavior$.pipe(
    map((s) => s === ScrollBehavior.FLOAT)
  );
  public noticeAnchor$ = this.noticeScrollBehavior$.pipe(
    map((s) =>
      s === ScrollBehavior.SCROLL
        ? InternalApplicationLayoutViewAnchors.scroll.notices
        : InternalApplicationLayoutViewAnchors.fixed.notices
    )
  );

  public headerScrollBehavior$ = observe(this._config.headerScrollBehavior);
  public headerHideOnScroll$ = this.headerScrollBehavior$.pipe(
    map((s) => s === ScrollBehavior.FLOAT)
  );
  public headerAnchor$ = this.headerScrollBehavior$.pipe(
    map((s) =>
      s === ScrollBehavior.SCROLL
        ? InternalApplicationLayoutViewAnchors.scroll.header
        : InternalApplicationLayoutViewAnchors.fixed.header
    )
  );

  public toolbarHorizontalStartScrollBehavior$ = observe(
    this._config.toolbarHorizontalStartScrollBehavior
  );
  public toolbarHorizontalStartHideOnScroll$ =
    this.toolbarHorizontalStartScrollBehavior$.pipe(
      map((s) => s === ScrollBehavior.FLOAT)
    );
  public toolbarHorizontalStartAnchor$ =
    this.toolbarHorizontalStartScrollBehavior$.pipe(
      map((s) =>
        s === ScrollBehavior.SCROLL
          ? InternalApplicationLayoutViewAnchors.scroll.toolBarHorizontalStart
          : InternalApplicationLayoutViewAnchors.fixed.toolBarHorizontalStart
      )
    );

  public toolbarHorizontalEndScrollBehavior$ = observe(
    this._config.toolbarHorizontalEndScrollBehavior
  );
  public toolbarHorizontalEndHideOnScroll$ =
    this.toolbarHorizontalEndScrollBehavior$.pipe(
      map((s) => s === ScrollBehavior.FLOAT)
    );
  public toolbarHorizontalEndAnchor$ =
    this.toolbarHorizontalEndScrollBehavior$.pipe(
      map((s) =>
        s === ScrollBehavior.SCROLL
          ? InternalApplicationLayoutViewAnchors.scroll.toolBarHorizontalEnd
          : InternalApplicationLayoutViewAnchors.fixed.toolBarHorizontalEnd
      )
    );

  public footerScrollBehavior$ = observe(this._config.footerScrollBehavior);
  public footerHideOnScroll$ = this.footerScrollBehavior$.pipe(
    map((s) => s === ScrollBehavior.FLOAT)
  );
  public footerAnchor$ = this.footerScrollBehavior$.pipe(
    map((s) =>
      s === ScrollBehavior.SCROLL
        ? InternalApplicationLayoutViewAnchors.scroll.footer
        : InternalApplicationLayoutViewAnchors.fixed.footer
    )
  );

  public toolbarVerticalStartScrollBehavior$ = observe(
    this._config.toolbarVerticalStartScrollBehavior
  );
  public toolbarVerticalStartHideOnScroll$ =
    this.toolbarVerticalStartScrollBehavior$.pipe(
      map((s) => s === ScrollBehavior.FLOAT)
    );
  public toolbarVerticalStartAnchor$ =
    this.toolbarVerticalStartScrollBehavior$.pipe(
      map((s) =>
        s === ScrollBehavior.SCROLL
          ? InternalApplicationLayoutViewAnchors.scroll.toolBarVerticalStart
          : InternalApplicationLayoutViewAnchors.fixed.toolBarVerticalStart
      )
    );

  public toolbarVerticalEndScrollBehavior$ = observe(
    this._config.toolbarVerticalEndScrollBehavior
  );
  public toolbarVerticalEndHideOnScroll$ =
    this.toolbarVerticalEndScrollBehavior$.pipe(
      map((s) => s === ScrollBehavior.FLOAT)
    );
  public toolbarVerticalEndAnchor$ =
    this.toolbarVerticalEndScrollBehavior$.pipe(
      map((s) =>
        s === ScrollBehavior.SCROLL
          ? InternalApplicationLayoutViewAnchors.scroll.toolBarVerticalEnd
          : InternalApplicationLayoutViewAnchors.fixed.toolBarVerticalEnd
      )
    );

  public menuStartScrollBehavior$ = observe(
    this._config.menuStartScrollBehavior
  );
  public menuStartHideOnScroll$ = this.menuStartScrollBehavior$.pipe(
    map((s) => s === ScrollBehavior.FLOAT)
  );
  public menuStartAnchor$ = this.menuStartScrollBehavior$.pipe(
    map((s) =>
      s === ScrollBehavior.SCROLL
        ? InternalApplicationLayoutViewAnchors.scroll.menuStart
        : InternalApplicationLayoutViewAnchors.fixed.menuStart
    )
  );

  public menuEndScrollBehavior$ = observe(this._config.menuEndScrollBehavior);
  public menuEndHideOnScroll$ = this.menuEndScrollBehavior$.pipe(
    map((s) => s === ScrollBehavior.FLOAT)
  );
  public menuEndAnchor$ = this.menuEndScrollBehavior$.pipe(
    map((s) =>
      s === ScrollBehavior.SCROLL
        ? InternalApplicationLayoutViewAnchors.scroll.menuEnd
        : InternalApplicationLayoutViewAnchors.fixed.menuEnd
    )
  );

  public ngOnInit(): void {}
  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  constructor(
    @Inject(FINAL_APPLICATION_SHELL_CONFIG)
    private readonly _config: ApplicationShellConfig,
    private readonly _changeRef: ChangeDetectorRef,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {}

  public viewportResize(resize: ResizeObserverEntry, container: HTMLElement) {
    const element = resize.target as HTMLElement;

    const top = element.offsetTop;
    const left = element.offsetLeft;
    const right =
      (element.parentElement?.clientWidth ?? 0) - (left + element.offsetWidth);
    const bottom =
      (element.parentElement?.clientHeight ?? 0) - (top + element.offsetHeight);

    container.style.setProperty(`--content-viewport-top`, `${top}px`);
    container.style.setProperty(`--content-viewport-left`, `${left}px`);
    container.style.setProperty(`--content-viewport-right`, `${right}px`);
    container.style.setProperty(`--content-viewport-bottom`, `${bottom}px`);
  }

  @Input()
  @HostBinding("attr.show-modal")
  public modal: number = 0;

  @Output()
  public modalClick: EventEmitter<MouseEvent> = new EventEmitter();

  /*public anchors = ViewAnchors;

  private _scrollHide: boolean = false;

  HeaderPosition = HeaderPosition;

  private destroy$ = new Subject<void>();

  @ViewChild("scrollAreaOuter", { static: true, read: CdkScrollable })
  private scrollAreaOuter!: CdkScrollable;
  @ViewChild("scrollAreaInner", { static: true, read: CdkScrollable })
  private scrollAreaInner!: CdkScrollable;
  @ViewChild("scrollAreaContent", { static: true, read: CdkScrollable })
  private scrollAreaContent!: CdkScrollable;
  @ViewChild("scrollAreaContentInner", { static: true, read: CdkScrollable })
  private scrollAreaContentInner!: CdkScrollable;

  public scrollMode$ = observe(this._config.scrollMode);
  public scrollModeClass$ = this.scrollMode$.pipe(
    map((m) => ScrollMode[m]?.toLowerCase())
  );

  private endScroll$ = new Subject<void>();

  public scrollArea$ = this.scrollMode$.pipe(
    map((m) => {
      switch (m) {
        case ScrollMode.FIXED_MENUS:
          return this.scrollAreaContentInner;
        case ScrollMode.FIXED_SIDES:
          return this.scrollAreaContent;
        case ScrollMode.FIXED_TOP:
          return this.scrollAreaInner;
        default:
        case ScrollMode.ALL:
          return this.scrollAreaOuter;
      }
    }),
    distinctUntilChanged(),
    shareReplay(1),
    takeUntil(this.destroy$)
  );

  public headerMode$ = observe(this._config.headerMode);
  public headerPosition$ = observe(this._config.headerPosition);
  public headerPositionOuter$ = this.headerPosition$.pipe(
    map((p) => p === HeaderPosition.OUTER)
  );
  public headerPositionAnchor$ = this.headerPositionOuter$.pipe(
    map((o) => (o ? "header.outer" : "header.inner"))
  );

  constructor(
    @Inject(FINAL_APPLICATION_SHELL_CONFIG)
    private readonly _config: ApplicationShellConfig,
    private readonly _changeRef: ChangeDetectorRef,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }
  ngOnInit(): void {
    this.scrollArea$.subscribe((area) => {
      this.endScroll$.next();
      let currentPos = area.measureScrollOffset("top");
      area
        ?.elementScrolled()
        .pipe(
          takeUntil(this.endScroll$),
          takeUntil(this.destroy$),
          throttleTime(50, undefined, { trailing: true })
        )
        .subscribe((event) => {
          const pos = area.measureScrollOffset("top");
          const delta = pos - currentPos;
          if (pos <= 128) {
            this._scrollHide = false;
          } else if (delta >= 60) {
            this._scrollHide = true;
          } else if (delta <= -60) {
            this._scrollHide = false;
          }

          if (this._scrollHide) {
            this._elementRef.nativeElement.classList.add("scroll-hide");
          } else {
            this._elementRef.nativeElement.classList.remove("scroll-hide");
          }

          currentPos = pos;
        });
    });
  }

  public readonly viewAnchors = ApplicationViewAnchors;

  */
  /*
  public panelWrapperComponent = PanelWrapperComponent;

  public readonly _va = InternalViewAnchors;

  public headerMode$ = observe(this._config.headerMode);
  public headerPosition$ = observe(this._config.headerPosition);
  public headerInnerPosition$ = this.headerPosition$.pipe(map(p => p === HeaderPosition.INNER))


  @HostBinding('attr.scroll')
  public get scrollMode(){
    return 'header';
  }

  @ViewChild("scrollArea", { static: true, read: MatSidenavContent })
  public scrollArea!: MatSidenavContent;

  public leftMenuMode$ = observe(this._config.leftMenuMode).pipe(
    takeUntil(this.destroy$)
  );

  public showLeftMenuButton$ = this.leftMenuMode$.pipe(
    map((m) => m !== MenuMode.FIXED)
  );

  public leftMenuSideNavMode$ = this.leftMenuMode$.pipe(
    map(
      (m) =>
        ["side", "side", "over", "push"][m ?? MenuMode.FIXED] as MatDrawerMode
    )
  );

  public leftMenuSideNavOpen$ = this.leftMenuMode$.pipe(
    map((m) => {
      if (m === MenuMode.FIXED) {
        return true;
      }
      return false;
    })
  );

  public rightMenuMode$ = observe(this._config.rightMenuMode).pipe(
    takeUntil(this.destroy$)
  );

  public showRightMenuButton$ = this.rightMenuMode$.pipe(
    map((m) => m !== MenuMode.FIXED)
  );
  public rightMenuSideNavMode$ = this.rightMenuMode$.pipe(
    map(
      (m) =>
        ["side", "side", "over", "push"][m ?? MenuMode.FIXED] as MatDrawerMode
    )
  );

  public rightMenuSideNavOpen$ = this.rightMenuMode$.pipe(
    map((m) => {
      if (m === MenuMode.FIXED) {
        return true;
      }
      return false;
    })
  );

  constructor(
    @Inject(FINAL_APPLICATION_SHELL_CONFIG)
    private readonly _config: ApplicationShellConfig
  ) {}

  ngOnInit(): void {}
  */
}
