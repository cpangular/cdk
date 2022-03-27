import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ResizeObservable } from "@cpangular/cdk/resize";
import { observe } from "@cpangular/cdk/value-resolver";

import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
  filter
} from "rxjs";
import { IApplicationConfiguration } from "../../config/ApplicationConfiguration";
import { MenuMode, MenuToggle } from "../layout/MenuMode";
import { MenuAnchors } from "./MenuAnchors";

@Directive()
export class ApplicationMenuBaseComponent implements OnInit, OnDestroy {
  public anchors = MenuAnchors;

  protected readonly destroy$ = new Subject<void>();

  private readonly _side: BehaviorSubject<string> = new BehaviorSubject('');
  @Input()
  @HostBinding("attr.side")
  public get side(): string {
    return this._side.value;
  }
  public set side(value: string) {
    if (this._side.value != value) {
      this._side.next(value);
    }
  }
  @Output()
  public readonly sideChange = this._side.pipe(filter(v => v !== ''));

  protected readonly config$ = this._side.pipe(
    map((side) =>
      side === "end" ? this._config.menuEnd : this._config.menuStart
    )
  );

  //@HostBinding("attr.mode")
  //private _modeAttr: string = MenuMode[MenuMode.SLIDE].toLowerCase();

  @Output()
  public readonly modeChange = this.config$.pipe(
    map((c) => c.mode),
    switchMap((m) => observe(m)),
   // tap((m) => (this._modeAttr = MenuMode[m]?.toLowerCase()))
  );

  private readonly _opened: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  @HostBinding("class.init")
  public animInitialized: boolean = false;

  @Input()
  @HostBinding("attr.opened")
  @HostBinding("class.opened")
  public get opened(): boolean {
    return this._opened.value;
  }
  public set opened(value: BooleanInput) {
    value = coerceBooleanProperty(value);
    if (this.opened !== value) {
      this._opened.next(value);
    }
  }
  @Output()
  public readonly openedChange = this._opened.asObservable();

  @Output()
  public readonly showButton$ = this.modeChange.pipe(
    takeUntil(this.destroy$),
    map((m) => (m & MenuToggle.TOGGLE) === MenuToggle.TOGGLE),

  ); 

  public readonly _initiallyOpen$ = this.showButton$.pipe(
    takeUntil(this.destroy$),
    map((t) => !t),
    distinctUntilChanged(),
    shareReplay(1)
  );



  @ViewChild("menuButtonContainer")
  private menuButtonContainer?: ElementRef<HTMLDivElement>;

  public readonly menuButtonAnchor$ = this.sideChange.pipe(
    map((s) =>
      s === "end" ? this.anchors.menuEndButton : this.anchors.menuStartButton
    )
  );
  public resize$ = new ResizeObservable(this._elmRef.nativeElement).pipe(
    takeUntil(this.destroy$)
  );
  public width$ = this.resize$.pipe(map((s) => s.contentRect.width));

  constructor(
    side: "start" | "end",
    protected readonly _config: IApplicationConfiguration,
    protected readonly _elmRef: ElementRef<HTMLElement>
  ) {
    this._side.next(side);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
  ngOnInit(): void {
    this.width$.subscribe((w) => {
      this.setButtonCssProps(w);
    });
    this._initiallyOpen$.subscribe((o) => {
      this.opened = o;
    });
    setTimeout(() => {
      this.animInitialized = true;
    });
  }

  private setButtonCssProps(width: number) {
    if (this.menuButtonContainer?.nativeElement) {
      //this.menuButtonContainer.nativeElement.style.minWidth = `${width}px`;
    }
  }
}
