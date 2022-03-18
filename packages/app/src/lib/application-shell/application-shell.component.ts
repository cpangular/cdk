import { CdkScrollable } from "@angular/cdk/scrolling";
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AuthenticationState } from "@cpangular/app/auth";
import { observe } from "@cpangular/cdk/value-resolver";
import { ViewAnchorService } from "@cpangular/cdk/view-anchor";
import { Select } from "@ngxs/store";
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
} from "rxjs";
import { ApplicationShellConfig } from "./ApplicationShellConfig";
import { ApplicationViewAnchors } from "./ApplicationViewAnchors";
import { FINAL_APPLICATION_SHELL_CONFIG } from "./FINAL_APPLICATION_SHELL_CONFIG";
import { HeaderPosition } from "./HeaderMode";
import { InternalViewAnchors } from "./InternalViewAnchors";
import { MenuMode } from "./MenuMode";
import { ScrollBehavior } from "./ScrollBehavior";
import { ScrollMode } from "./ScrollMode";

@Component({
  selector: "cpng-application-shell",
  templateUrl: "./application-shell.component.html",
  styleUrls: ["./application-shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[ViewAnchorService]
})
export class ApplicationShellComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private _modalClick$ = new Subject<void>();
  private _mainMenuOpened$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _secondaryMenuOpened$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  @Select(AuthenticationState.user) user$!: Observable<
    ReturnType<typeof AuthenticationState.user>
  >;

  @Select(AuthenticationState.status) status$!: Observable<
    ReturnType<typeof AuthenticationState.status>
  >;
  
  public mainMenuMode$ = observe(this._config.mainMenuMode);

  public mainMenuFixed$ = observe(this._config.menuStartScrollBehavior).pipe(
    map((s) => s !== ScrollBehavior.SCROLL)
  );

  public get mainMenuOpened(): boolean {
    return this._mainMenuOpened$.value;
  }

  public set mainMenuOpened(value: boolean) {
    this._mainMenuOpened$.next(value);
  }

  public mainMenuModal$ = combineLatest([
    this.mainMenuMode$,
    this._mainMenuOpened$,
    this.mainMenuFixed$,
  ]).pipe(
    map(([mode, opened, fixed]) => {
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

  public secondaryMenuMode$ = observe(this._config.secondaryMenuMode);
  public secondaryMenuFixed$ = observe(this._config.menuEndScrollBehavior).pipe(
    map((s) => s !== ScrollBehavior.SCROLL)
  );

  public get secondaryMenuOpened(): boolean {
    return this._secondaryMenuOpened$.value;
  }

  public set secondaryMenuOpened(value: boolean) {
    this._secondaryMenuOpened$.next(value);
  }

  public secondaryMenuModal$ = combineLatest([
    this.secondaryMenuMode$,
    this._secondaryMenuOpened$,
    this.secondaryMenuFixed$,
  ]).pipe(
    map(([mode, opened, fixed]) => {
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

  public menuModal$ = combineLatest([
    this.mainMenuModal$,
    this.secondaryMenuModal$,
  ]).pipe(
    map(([main, second]) => Math.max(main, second)),
    distinctUntilChanged()
  );

  private menuModalClose$ = combineLatest([
    this.mainMenuMode$,
    this.secondaryMenuMode$,
    this._modalClick$,
  ]).pipe(
    takeUntil(this.destroy$),
    map(([main, second]) => [
      main === MenuMode.OVER || main === MenuMode.PUSH,
      second === MenuMode.OVER || second === MenuMode.PUSH,
    ])
  );

  public constructor(
    @Inject(FINAL_APPLICATION_SHELL_CONFIG)
    private readonly _config: ApplicationShellConfig
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
  public ngOnInit(): void {
    this.menuModalClose$.subscribe(([main, second]) => {
      if (main) {
        this.mainMenuOpened = false;
      }
      if (second) {
        this.secondaryMenuOpened = false;
      }
    });
  }

  public modalClick() {
    this._modalClick$.next();
  }

  /* public __anchors = InternalViewAnchors;

  HeaderPosition = HeaderPosition;


  @ViewChild("scrollAreaInner", { static: true, read: CdkScrollable })
  private scrollAreaInner!: CdkScrollable;

  public scrollMode$ = observe(this._config.scrollMode);
  public scrollModeClass$ = this.scrollMode$.pipe(map((m) => ScrollMode[m]?.toLowerCase()));

  public headerMode$ = observe(this._config.headerMode);
  public headerPosition$ = observe(this._config.headerPosition);
  public headerPositionOuter$ = this.headerPosition$.pipe(
    map((p) => p === HeaderPosition.OUTER)
  );
  public headerPositionAnchor$ = this.headerPositionOuter$.pipe(
    map((o) => (o ? "header.outer" : "header.inner"))
  );
*/
}
