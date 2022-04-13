import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, NgZone, Output, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';
import { LayerSizes } from './LayerSizes';

@Component({
  selector: 'div[layer]',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerComponent {
  @ContentChild('top')
  public _topTemplate!: TemplateRef<any>;
  @ContentChild('left')
  public _leftTemplate!: TemplateRef<any>;
  @ContentChild('bottom')
  public _bottomTemplate!: TemplateRef<any>;
  @ContentChild('right')
  public _rightTemplate!: TemplateRef<any>;

  public _resizeTop$: BehaviorSubject<ResizeObserverEntry | undefined> = new BehaviorSubject<ResizeObserverEntry | undefined>(undefined);
  public _resizeLeft$: BehaviorSubject<ResizeObserverEntry | undefined> = new BehaviorSubject<ResizeObserverEntry | undefined>(undefined);
  public _resizeBottom$: BehaviorSubject<ResizeObserverEntry | undefined> = new BehaviorSubject<ResizeObserverEntry | undefined>(undefined);
  public _resizeRight$: BehaviorSubject<ResizeObserverEntry | undefined> = new BehaviorSubject<ResizeObserverEntry | undefined>(undefined);
  public _resizeRest$: BehaviorSubject<ResizeObserverEntry | undefined> = new BehaviorSubject<ResizeObserverEntry | undefined>(undefined);

  private _resizeRaw$ = combineLatest([this._resizeRest$, this._resizeTop$, this._resizeLeft$, this._resizeRight$, this._resizeBottom$]);

  private _resize$ = this._resizeRaw$.pipe(
    map((sizes) => sizes.map((s) => s?.target.getBoundingClientRect() ?? new DOMRect())),
    map((sizes) => {
      const rest = sizes[0];
      const top = sizes[1];
      const left = sizes[2];
      const right = sizes[3];
      const bottom = sizes[4];

      return {
        rest,
        top,
        left,
        right,
        bottom,
      };
    }),
    shareReplay(1)
  );

  @Input()
  public layer: string = '';

  @Output()
  public layerResize: EventEmitter<LayerSizes> = new EventEmitter();

  private _topOpened: boolean = true;
  @Output()
  public topOpenedChange: EventEmitter<boolean> = new EventEmitter();
  @Input()
  public get topOpened(): boolean {
    return this._topOpened;
  }
  public set topOpened(value: BooleanInput) {
    const v = coerceBooleanProperty(value);
    if (this._topOpened !== v) {
      this._topOpened = v;
      this.topOpenedChange.next(v);
    }
  }

  private _bottomOpened: boolean = true;
  @Output()
  public bottomOpenedChange: EventEmitter<boolean> = new EventEmitter();
  @Input()
  public get bottomOpened(): boolean {
    return this._bottomOpened;
  }
  public set bottomOpened(value: BooleanInput) {
    const v = coerceBooleanProperty(value);
    if (this._bottomOpened !== v) {
      this._bottomOpened = v;
      this.bottomOpenedChange.next(v);
    }
  }

  private _leftOpened: boolean = true;
  @Output()
  public leftOpenedChange: EventEmitter<boolean> = new EventEmitter();
  @Input()
  public get leftOpened(): boolean {
    return this._leftOpened;
  }
  public set leftOpened(value: BooleanInput) {
    const v = coerceBooleanProperty(value);
    if (this._leftOpened !== v) {
      this._leftOpened = v;
      this.leftOpenedChange.next(v);
    }
  }
  private _rightOpened: boolean = true;
  @Output()
  public rightOpenedChange: EventEmitter<boolean> = new EventEmitter();
  @Input()
  public get rightOpened(): boolean {
    return this._rightOpened;
  }
  public set rightOpened(value: BooleanInput) {
    const v = coerceBooleanProperty(value);
    if (this._rightOpened !== v) {
      this._rightOpened = v;
      this.rightOpenedChange.next(v);
    }
  }

  public openAll() {
    this.topOpened = true;
    this.bottomOpened = true;
    this.leftOpened = true;
    this.rightOpened = true;
  }

  public closeAll() {
    this.topOpened = false;
    this.bottomOpened = false;
    this.leftOpened = false;
    this.rightOpened = false;
  }

  constructor(private changeRef: ChangeDetectorRef, zone: NgZone) {
    this._resize$.subscribe((v) => {
      zone.run(() => this.layerResize.next(v));
    });
  }
}
