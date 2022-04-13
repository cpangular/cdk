import { CdkScrollable } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { observe } from '@cpangular/cdk/value-resolver';
import { ViewAnchorService } from '@cpangular/cdk/view-anchor';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, pairwise, Subject, tap, throttleTime } from 'rxjs';
import { IApplicationConfiguration } from '../../config/ApplicationConfiguration';
import { FinalApplicationConfiguration } from '../../config/FinalApplicationConfiguration';
import { HeaderAnchors } from '../header/HeaderAnchors';
import { MenuAnchors } from '../menu-base/MenuAnchors';
import { LayerSizes } from './layer/LayerSizes';
import { LayoutRegions } from './LayoutRegions';
import { MenuLayoutBehavior, MenuRelativeLocation } from './MenuMode';
import { ScrollBehavior } from './ScrollBehavior';
import { ScrollBehaviorWatcher } from './ScrollBehaviorWatcher';
import { anyTrue$, isEqual$ } from './util';

@Component({
  selector: 'cpng-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public readonly regions = LayoutRegions;
  public readonly menuAnchors = MenuAnchors;
  public readonly headerAnchors = HeaderAnchors;
  public readonly headerScroll = new ScrollBehaviorWatcher(observe(this.config.header.scrollBehavior!));
  public readonly headerLocation$: Observable<symbol> = this.headerScroll.fixed$.pipe(
    map((f) => (f ? this.regions.content.top : this.regions.scroll.top))
  );
  public readonly footerScroll = new ScrollBehaviorWatcher(observe(this.config.header.scrollBehavior!));
  public readonly rightToLeft$ = observe(this.config.layout.rightToLeft);

  public readonly constrainApplication$ = observe(this.config.layout.constrainApplication);
  public readonly constrainedApplicationAlign$ = observe(this.config.layout.constrainedApplicationAlign);

  public readonly menuStartMode$ = observe(this.config.menuStart.mode);
  public readonly menuStartScroll = new ScrollBehaviorWatcher(observe(this.config.menuStart.scrollBehavior!));
  public readonly menuStartLocation$: Observable<symbol> = combineLatest([this.menuStartMode$, this.headerScroll.fixed$]).pipe(
    map(([mode, headerFixed]) => {
      const location = mode & MenuRelativeLocation.UNDER || mode & MenuRelativeLocation.OVER || mode & MenuRelativeLocation.VIEWPORT;
      const behavior = mode & MenuLayoutBehavior.INLINE || mode & MenuLayoutBehavior.OVER;

      if (location === MenuRelativeLocation.VIEWPORT) {
        return behavior === MenuLayoutBehavior.INLINE ? this.regions.viewport.left : this.regions.viewport.overlay.left;
      }

      if (location === MenuRelativeLocation.OVER) {
        if (headerFixed) {
          return behavior === MenuLayoutBehavior.INLINE ? this.regions.application.left : this.regions.application.overlay.left;
        }
        return behavior === MenuLayoutBehavior.INLINE ? this.regions.content.left : this.regions.content.overlay.left;
      } else if (location === MenuRelativeLocation.UNDER) {
        if (headerFixed) {
          return behavior === MenuLayoutBehavior.INLINE ? this.regions.content.left : this.regions.content.innerOverlay.left;
        }
        return behavior === MenuLayoutBehavior.INLINE ? this.regions.scroll.left : this.regions.scroll.innerOverlay.left;
      }

      return this.regions.scroll.left;
    })
    //tap(console.log)
  );

  private readonly _menuStartOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get menuStartOpened(): boolean {
    return this._menuStartOpened$.value;
  }

  public set menuStartOpened(value: boolean) {
    this._menuStartOpened$.next(value);
  }

  public readonly menuStartModal$ = combineLatest([this._menuStartOpened$, this.menuStartMode$, this.headerLocation$]).pipe(
    map(([opened, mode, header]) => {
      const behavior = mode & MenuLayoutBehavior.INLINE || mode & MenuLayoutBehavior.OVER;

      if (!opened || behavior === MenuLayoutBehavior.INLINE) return 0;

      const location = mode & MenuRelativeLocation.UNDER || mode & MenuRelativeLocation.OVER || mode & MenuRelativeLocation.VIEWPORT;
      switch (location) {
        case MenuRelativeLocation.UNDER:
          return header === this.regions.content.top ? 2 : 1;
        case MenuRelativeLocation.OVER:
          return header === this.regions.content.top ? 3 : 2;
        case MenuRelativeLocation.VIEWPORT:
          return 4;
      }
      return 0;
    }),
    distinctUntilChanged()
  );

  public readonly menuEndMode$ = observe(this.config.menuEnd.mode);
  public readonly menuEndScroll = new ScrollBehaviorWatcher(observe(this.config.menuEnd.scrollBehavior!));

  public readonly menuEndLocation$: Observable<symbol> = combineLatest([this.menuEndMode$, this.headerScroll.fixed$]).pipe(
    map(([mode, headerFixed]) => {
      const location = mode & MenuRelativeLocation.UNDER || mode & MenuRelativeLocation.OVER || mode & MenuRelativeLocation.VIEWPORT;
      const behavior = mode & MenuLayoutBehavior.INLINE || mode & MenuLayoutBehavior.OVER;

      if (location === MenuRelativeLocation.VIEWPORT) {
        return behavior === MenuLayoutBehavior.INLINE ? this.regions.viewport.right : this.regions.viewport.overlay.right;
      }

      if (location === MenuRelativeLocation.OVER) {
        if (headerFixed) {
          return behavior === MenuLayoutBehavior.INLINE ? this.regions.application.right : this.regions.application.overlay.right;
        }
        return behavior === MenuLayoutBehavior.INLINE ? this.regions.content.right : this.regions.content.overlay.right;
      } else if (location === MenuRelativeLocation.UNDER) {
        if (headerFixed) {
          return behavior === MenuLayoutBehavior.INLINE ? this.regions.content.right : this.regions.content.innerOverlay.right;
        }
        return behavior === MenuLayoutBehavior.INLINE ? this.regions.scroll.right : this.regions.scroll.innerOverlay.right;
      }
      return this.regions.scroll.right;
    })
  );

  private readonly _menuEndOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get menuEndOpened(): boolean {
    return this._menuEndOpened$.value;
  }

  public set menuEndOpened(value: boolean) {
    this._menuEndOpened$.next(value);
  }

  public readonly menuEndModal$ = combineLatest([this._menuEndOpened$, this.menuEndMode$, this.headerLocation$]).pipe(
    map(([opened, mode, header]) => {
      const behavior = mode & MenuLayoutBehavior.INLINE || mode & MenuLayoutBehavior.OVER;

      if (!opened || behavior === MenuLayoutBehavior.INLINE) return 0;

      const location = mode & MenuRelativeLocation.UNDER || mode & MenuRelativeLocation.OVER || mode & MenuRelativeLocation.VIEWPORT;
      switch (location) {
        case MenuRelativeLocation.UNDER:
          return header === this.regions.content.top ? 2 : 1;
        case MenuRelativeLocation.OVER:
          return header === this.regions.content.top ? 3 : 2;
        case MenuRelativeLocation.VIEWPORT:
          return 4;
      }
      return 0;
    }),
    distinctUntilChanged()
  );

  public readonly modal$ = combineLatest([this.menuStartModal$, this.menuEndModal$]).pipe(
    map(([s, e]) => Math.max(s, e)),
    distinctUntilChanged(),
    tap((v) => {
      this._modal = v;
      this.changeRef.detectChanges();
    })
  );

  private _modal: number = 0;

  @HostBinding('attr.modal')
  public get modal() {
    return this._modal;
  }

  public readonly modalClicked$ = new Subject<any>();

  public readonly noticeStartScroll = new ScrollBehaviorWatcher(observe(ScrollBehavior.FIXED));
  public readonly noticeEndScroll = new ScrollBehaviorWatcher(observe(ScrollBehavior.FIXED));

  // Viewport Overlay Visibility //
  public readonly hasViewportOverlayTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.top)]);
  public readonly hasViewportOverlayLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.viewport.overlay.left),
    this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.left),
  ]);
  public readonly hasViewportOverlayBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.bottom)]);
  public readonly hasViewportOverlayRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.viewport.overlay.right),
    this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.right),
  ]);
  public readonly hasViewportOverlayCenter$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.overlay.center)]);

  // Viewport Inner Overlay Visibility //
  public readonly hasViewportInnerOverlayTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.innerOverlay.top)]);
  public readonly hasViewportInnerOverlayLeft$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.innerOverlay.left)]);
  public readonly hasViewportInnerOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.innerOverlay.bottom),
  ]);
  public readonly hasViewportInnerOverlayRight$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.innerOverlay.right),
  ]);
  public readonly hasViewportInnerOverlayCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.viewport.innerOverlay.center),
  ]);

  // Viewport Visibility //
  public readonly hasViewportTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.top)]);
  public readonly hasViewportLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.viewport.left),
    this.viewAnchorService.hasViewChange(this.regions.viewport.left),
  ]);
  public readonly hasViewportBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.bottom)]);
  public readonly hasViewportRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.viewport.right),
    this.viewAnchorService.hasViewChange(this.regions.viewport.right),
  ]);
  public readonly hasViewportCenter$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.viewport.center)]);

  // Application Overlay Visibility //
  public readonly hasApplicationOverlayTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.application.overlay.top)]);
  public readonly hasApplicationOverlayLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.application.overlay.left),
    this.viewAnchorService.hasViewChange(this.regions.application.overlay.left),
  ]);
  public readonly hasApplicationOverlayBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.application.overlay.bottom)]);
  public readonly hasApplicationOverlayRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.application.overlay.right),
    this.viewAnchorService.hasViewChange(this.regions.application.overlay.right),
  ]);
  public readonly hasApplicationOverlayCenter$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.application.overlay.center)]);

  // Application Inner Overlay Visibility //
  public readonly hasApplicationInnerOverlayTop$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.application.innerOverlay.top),
  ]);
  public readonly hasApplicationInnerOverlayLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.application.innerOverlay.left),
    this.viewAnchorService.hasViewChange(this.regions.application.innerOverlay.left),
  ]);
  public readonly hasApplicationInnerOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.application.innerOverlay.bottom),
  ]);
  public readonly hasApplicationInnerOverlayRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.application.innerOverlay.right),
    this.viewAnchorService.hasViewChange(this.regions.application.innerOverlay.right),
  ]);
  public readonly hasApplicationInnerOverlayCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.application.innerOverlay.center),
  ]);

  // Application Visibility //
  public readonly hasApplicationTop$ = anyTrue$([
    isEqual$(this.headerLocation$, this.regions.application.top),
    this.viewAnchorService.hasViewChange(this.regions.application.top),
  ]);
  public readonly hasApplicationLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.application.left),
    this.viewAnchorService.hasViewChange(this.regions.application.left),
  ]);
  public readonly hasApplicationBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.application.bottom)]);
  public readonly hasApplicationRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.application.right),
    this.viewAnchorService.hasViewChange(this.regions.application.right),
  ]);
  public readonly hasApplicationCenter$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.application.center)]);

  // Content Overlay Visibility //
  public readonly hasContentOverlayTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.content.overlay.top)]);
  public readonly hasContentOverlayLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.content.overlay.left),
    this.viewAnchorService.hasViewChange(this.regions.content.overlay.left),
  ]);
  public readonly hasContentOverlayBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.content.overlay.bottom)]);
  public readonly hasContentOverlayRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.content.overlay.right),
    this.viewAnchorService.hasViewChange(this.regions.content.overlay.right),
  ]);
  public readonly hasContentOverlayCenter$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.content.overlay.center)]);

  // Content Inner Overlay Visibility //
  public readonly hasContentInnerOverlayTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.content.innerOverlay.top)]);
  public readonly hasContentInnerOverlayLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.content.innerOverlay.left),
    this.viewAnchorService.hasViewChange(this.regions.content.innerOverlay.left),
  ]);
  public readonly hasContentInnerOverlayBottom$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.content.innerOverlay.bottom),
  ]);
  public readonly hasContentInnerOverlayRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.content.innerOverlay.right),
    this.viewAnchorService.hasViewChange(this.regions.content.innerOverlay.right),
  ]);
  public readonly hasContentInnerOverlayCenter$ = anyTrue$([
    this.viewAnchorService.hasViewChange(this.regions.content.innerOverlay.center),
  ]);

  // Content Visibility //
  public readonly hasContentTop$ = anyTrue$([
    isEqual$(this.headerLocation$, this.regions.content.top),
    this.viewAnchorService.hasViewChange(this.regions.content.top),
  ]);

  public readonly hasContentLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.content.left),
    this.viewAnchorService.hasViewChange(this.regions.content.left),
  ]);
  public readonly hasContentBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.content.bottom)]);
  public readonly hasContentRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.content.right),
    this.viewAnchorService.hasViewChange(this.regions.content.right),
  ]);
  public readonly hasContentCenter$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.content.center)]);

  // Scroll Overlay Visibility //
  public readonly hasScrollOverlayTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.scroll.overlay.top)]);

  public readonly hasScrollOverlayLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.scroll.overlay.left),
    this.viewAnchorService.hasViewChange(this.regions.scroll.overlay.left),
  ]);
  public readonly hasScrollOverlayBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.scroll.overlay.bottom)]);
  public readonly hasScrollOverlayRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.scroll.overlay.right),
    this.viewAnchorService.hasViewChange(this.regions.scroll.overlay.right),
  ]);
  public readonly hasScrollOverlayCenter$ = anyTrue$([
    isEqual$(this.modal$, 2),
    this.viewAnchorService.hasViewChange(this.regions.scroll.overlay.center),
  ]);

  // Scroll Inner Overlay Visibility //
  public readonly hasScrollInnerOverlayTop$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.scroll.innerOverlay.top)]);
  public readonly hasScrollInnerOverlayLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.scroll.innerOverlay.left),
    this.viewAnchorService.hasViewChange(this.regions.scroll.innerOverlay.left),
  ]);
  public readonly hasScrollInnerOverlayBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.scroll.innerOverlay.bottom)]);
  public readonly hasScrollInnerOverlayRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.scroll.innerOverlay.right),
    this.viewAnchorService.hasViewChange(this.regions.scroll.innerOverlay.right),
  ]);
  public readonly hasScrollInnerOverlayCenter$ = anyTrue$([
    isEqual$(this.modal$, 2),
    this.viewAnchorService.hasViewChange(this.regions.scroll.innerOverlay.center),
  ]);

  // Scroll Visibility //
  public readonly hasScrollTop$ = anyTrue$([
    isEqual$(this.headerLocation$, this.regions.scroll.top),
    this.viewAnchorService.hasViewChange(this.regions.scroll.top),
  ]);

  public readonly hasScrollLeft$ = anyTrue$([
    isEqual$(this.menuStartLocation$, this.regions.scroll.left),
    this.viewAnchorService.hasViewChange(this.regions.scroll.left),
  ]);
  public readonly hasScrollBottom$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.scroll.bottom)]);
  public readonly hasScrollRight$ = anyTrue$([
    isEqual$(this.menuEndLocation$, this.regions.scroll.right),
    this.viewAnchorService.hasViewChange(this.regions.scroll.right),
  ]);
  public readonly hasScrollCenter$ = anyTrue$([this.viewAnchorService.hasViewChange(this.regions.scroll.center)]);

  @ViewChild(CdkScrollable, { static: true })
  private readonly scrollContainer!: CdkScrollable;
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
      map((evt) => this.scrollContainer.measureScrollOffset('top')),
      pairwise(),
      map(([prev, next]) => (next <= 128 ? Number.MIN_SAFE_INTEGER : next - prev)),
      filter((d) => Math.abs(d) > 80),
      map((d) => d > 0),
      distinctUntilChanged()
      //tap(console.log)
    );

    this.scrollHide$.subscribe((hide) =>
      hide ? this.elementRef.nativeElement.classList.add('scroll-hide') : this.elementRef.nativeElement.classList.remove('scroll-hide')
    );

    this.constrainedApplicationAlign$.subscribe((a) =>
      a ? this.elementRef.nativeElement.setAttribute('constrain', a) : this.elementRef.nativeElement.removeAttribute('constrain')
    );

    this.constrainApplication$.subscribe((size) =>
      size
        ? this.elementRef.nativeElement.style.setProperty('--constrain-app-width', size)
        : this.elementRef.nativeElement.style.removeProperty('--constrain-app-width')
    );

    this.modalClicked$.pipe(filter((v) => this.modal !== 0)).subscribe((v) => {
      if (this.menuStartOpened) {
        this.menuStartOpened = false;
      }
      if (this.menuEndOpened) {
        this.menuEndOpened = false;
      }
    });

    this.changeRef.detectChanges();
  }

  public _handleFixedLayerResize(sizes: LayerSizes) {
    this.setInsetProperties(this.elementRef.nativeElement, sizes);
  }

  public setInsetProperties(elm: HTMLElement, sizes: LayerSizes, prefix?: string) {
    elm.style.setProperty(`--${prefix ? `${prefix}-` : ''}top`, `${sizes.top.height}px`);
    elm.style.setProperty(`--${prefix ? `${prefix}-` : ''}left`, `${sizes.left.width}px`);
    elm.style.setProperty(`--${prefix ? `${prefix}-` : ''}bottom`, `${sizes.bottom.height}px`);
    elm.style.setProperty(`--${prefix ? `${prefix}-` : ''}right`, `${sizes.right.width}px`);
  }
}
