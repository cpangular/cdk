import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { observe } from '@cpangular/cdk/value-resolver';
import { Subject, takeUntil } from 'rxjs';
import { IApplicationConfiguration } from '../../config/ApplicationConfiguration';
import { FinalApplicationConfiguration } from '../../config/FinalApplicationConfiguration';

//import { InternalApplicationLayoutViewAnchors } from "../application-layout/InternalApplicationLayoutViewAnchors";

@Component({
  selector: 'cpng-application-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFooterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  //public viewAnchors = InternalApplicationLayoutViewAnchors;
  /*
  public headerColor$ = observe(this._config.headerColor).pipe(
    takeUntil(this.destroy$)
  );
  public headerMenuColor$ = observe(this._config.headerMenuColor).pipe(
    takeUntil(this.destroy$)
  );
  public headerSecondaryColor$ = observe(
    this._config.headerSecondaryColor
  ).pipe(takeUntil(this.destroy$));
*/
  constructor(
    //private readonly _changeDetector: ChangeDetectorRef,
    @Inject(FinalApplicationConfiguration)
    private readonly _config: IApplicationConfiguration
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }
  ngOnInit(): void {}
  /*
  public internalViewAnchors = InternalViewAnchors;
  public appViewAnchors = ApplicationViewAnchors;

  


  public mainHeaderColor$ = observe(this._config.mainHeaderColor).pipe(
    takeUntil(this.destroy$)
  );



  public rightMenuButtonColor$ = observe(
    this._config.rightMenuButtonColor
  ).pipe(takeUntil(this.destroy$));

  public secondaryHeaderColor$ = observe(
    this._config.secondaryHeaderColor
  ).pipe(takeUntil(this.destroy$));

  private _headerOpened: boolean = true;
  private _lastScrollPos: number = -1;
  private _scrollSub: Subscription = new Subscription();
  private _drawerState: DrawerState = "open";

  @ContentChild("leftMenuButton")
  public leftMenuButtonTemplate?: TemplateRef<any>;

  @Input()
  public scrollable?: CdkScrollable;

  public get headerOpened(): boolean {
    return this._headerOpened;
  }

  private get headerOpenState(): boolean {
    return this._drawerState == "open" || this._drawerState == "opening";
  }

  constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    @Inject(FINAL_APPLICATION_SHELL_CONFIG)
    private readonly _config: ApplicationShellConfig
  ) {}
  ngOnInit(): void {
    ///this.headerHideMode$.subscribe((hm) =>
   ///   this._updateHeaderMode(hm ?? HeaderMode.FIXED)
  ///  );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private _updateHeaderMode(mode: HeaderMode) {
    if (!this._headerOpened) {
      this._headerOpened = true;
    }
    if (mode === HeaderMode.SCROLL_AWAY) {
      this._addHeaderScrollAway();
    } else {
      this._removeHeaderScrollAway();
    }
  }

  public setDrawerState(state: DrawerState) {
    this._drawerState = state;
    this._lastScrollPos = this.scrollable?.measureScrollOffset("top") ?? 0;
  }

  public get isAnimatingDrawer() {
    return this._drawerState === "closing" || this._drawerState === "opening";
  }

  private _addHeaderScrollAway() {
    this._scrollSub.unsubscribe();
    this._lastScrollPos = this.scrollable?.measureScrollOffset("top") ?? 0;
    this._scrollSub = this.scrollable!.elementScrolled()
      .pipe(
        throttleTime(100, undefined, { trailing: true }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (evt) => {
          const scrollOffset = this.scrollable?.measureScrollOffset("top") ?? 0;
          const delta = scrollOffset - this._lastScrollPos;
          console.log(delta);
          this._lastScrollPos = scrollOffset;
          if (scrollOffset < 64) {
            if (!this._headerOpened) {
              this._headerOpened = true;
              this._changeDetector.detectChanges();
            }
          } else {
            if (!this.isAnimatingDrawer) {
              if (Math.abs(delta) >= 100) {
                if (delta < 0 && !this.headerOpenState) {
                  this._headerOpened = true;
                  this._changeDetector.detectChanges();
                } else if (delta > 0 && this.headerOpenState) {
                  this._headerOpened = false;
                  this._changeDetector.detectChanges();
                }
              }
            }
          }
        },
      });
  }

  private _removeHeaderScrollAway() {
    this._scrollSub.unsubscribe();
  }

  public contentChange(...rest: any[]) {
    console.log(rest);
  }
  */
}
