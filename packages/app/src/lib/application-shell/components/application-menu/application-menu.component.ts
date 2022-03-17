import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { coerceEnumProperty, EnumInput } from "@cpangular/cdk/coercion";
import { observe } from "@cpangular/cdk/value-resolver";
import { IViewDirective, ViewAnchorService } from "@cpangular/cdk/view-anchor";
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  pairwise,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from "rxjs";
import { ApplicationShellConfig } from "../../ApplicationShellConfig";
import { FINAL_APPLICATION_SHELL_CONFIG } from "../../FINAL_APPLICATION_SHELL_CONFIG";

import { MenuMode } from "../../MenuMode";
import { InternalApplicationLayoutViewAnchors } from "../application-layout/InternalApplicationLayoutViewAnchors";

@Component({
  selector: "cpng-application-menu",
  templateUrl: "./application-menu.component.html",
  styleUrls: ["./application-menu.component.scss"],
})
export class ApplicationMenuComponent
  implements OnInit, OnDestroy, IViewDirective
{
  private _opened: boolean = true;
  private destroy$ = new Subject<void>();
  viewAnchors = InternalApplicationLayoutViewAnchors;

  private _side: BehaviorSubject<string> = new BehaviorSubject("start");
  private _mode: BehaviorSubject<MenuMode> = new BehaviorSubject<MenuMode>(
    MenuMode.SLIDE
  );

  @Input()
  @HostBinding("attr.opened")
  @HostBinding("class.opened")
  public get opened(): boolean {
    return this._opened;
  }
  public set opened(value: boolean) {
    if (this._opened != value) {
      this._opened = value;
      this.openedChange.next(value);
    }
  }

  @Output()
  public openedChange: EventEmitter<boolean> = new EventEmitter();

  @HostBinding("class.init")
  public initialized: boolean = false;

  private _attachmentPoint$ = this._side.pipe(
    takeUntil(this.destroy$),
    map((s) =>
      s === "end"
        ? InternalApplicationLayoutViewAnchors.menuEnd
        : InternalApplicationLayoutViewAnchors.menuStart
    ),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public showButton$ = this._mode.pipe(
    takeUntil(this.destroy$),
    map((m) => m !== MenuMode.FIXED),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public initialOpen$ = this._mode.pipe(
    takeUntil(this.destroy$),
    map((m) => m === MenuMode.FIXED),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public icon$ = this._side.pipe(
    takeUntil(this.destroy$),
    switchMap((s)=>{
      if(s === 'end'){
        return observe(this._config.secondaryMenuIcon);
      }else{
        return observe(this._config.mainMenuIcon);
      }
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public templateRef?: TemplateRef<any> | undefined;

  @Input()
  public get side(): string {
    return this._side.value;
  }
  public set side(value: string) {
    if (this._side.value != value) {
      this._side.next(value);
    }
  }

  @Input()
  public get mode(): MenuMode {
    return this._mode.value;
  }
  public set mode(value: EnumInput<MenuMode>) {
    const val = coerceEnumProperty(value, MenuMode) ?? MenuMode.SLIDE;
    if (this._mode.value != val) {
      this._mode.next(val);
    }
  }

  @HostBinding("attr.mode")
  public get modeName(): string {
    return MenuMode[this.mode]?.toLowerCase();
  }

  public constructor(
    @Inject(FINAL_APPLICATION_SHELL_CONFIG)
    private readonly _config: ApplicationShellConfig,
    private readonly element: ElementRef<HTMLElement>,
    private readonly service: ViewAnchorService
  ) {}

  public removed(): void {}
  public added(to: string | symbol | undefined): void {}

  public getViewNodes(): Element[] {
    return [this.element.nativeElement];
  }

  public ngOnInit(): void {
    this._attachmentPoint$.subscribe((next) => {
      this.service.viewAdded(this, next);
    });
    this.initialOpen$.subscribe((o) => {
      this.opened = o;
    });
    setTimeout(() => {
      this.initialized = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
