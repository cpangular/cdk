import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from "@angular/animations";
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter
} from "@angular/core";

export type FromSide = "top" | "bottom" | "left" | "right";
export type Dimension = "height" | "width";

export type DrawerState = 'open' | 'opening' | 'closed' | 'closing';

@Component({
  selector: "cpng-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent implements OnInit {
  private _state: DrawerState = 'open';
  private _initialized: boolean = false;
  private _player?: AnimationPlayer;

  private _clone?: HTMLElement;

  private get _contentElement(): HTMLElement | undefined {
    return this._clone?.querySelector("div") ?? undefined;
  }

  private _currentMeasure: { width: number; height: number } = {
    width: 0,
    height: 0,
  };
  private _targetMeasure: { width: number; height: number } = {
    width: 0,
    height: 0,
  };

  @ViewChild("content", { static: true })
  private contentRef!: ElementRef<HTMLDivElement>;

  @Input()
  @HostBinding("attr.from")
  public from: FromSide = "top";

  @Input()
  public duration: number = 300;
  
  @Output()
  public stateChange:EventEmitter<DrawerState> = new EventEmitter()
  
  public get state(){
    return this._state;
  }

  private setState(value: DrawerState){
    if(this._state !== value){
      this._state = value;
      this.stateChange.next(value);
    }
  }


  @Input()
  @HostBinding("attr.opened")
  public get opened(): boolean {
    return this.state === 'open' || this.state === 'opening';
  }
  public set opened(value: boolean) {
    if (!this._initialized) {
      this._state = 'open';
      return;
    }
    if (this.opened !== value) {
      this.animate(value, this.duration);
    }
  }

  constructor(
    private readonly elmRef: ElementRef<HTMLLIElement>,
    private readonly builder: AnimationBuilder
  ) {}

  private createAnimationClone() {
    this.destroyAnimationClone();
    const vat = document.createElement("div");
    this.elmRef.nativeElement.style.display = "block";
    vat.innerHTML = this.elmRef.nativeElement.outerHTML;
    this._clone = (vat.firstElementChild as HTMLElement) ?? undefined;
    return this._clone;
  }

  private destroyAnimationClone() {
    if (this._clone) {
      this._clone.remove();
      this._clone = undefined;
    }
  }

  private addAnimationClone() {
    const clone = this.createAnimationClone();
    this.elmRef.nativeElement.parentElement?.insertBefore(
      clone,
      this.elmRef.nativeElement
    );
    this.elmRef.nativeElement.style.display = "none";
  }

  private measure(opened:boolean) {
    const elm = this.elmRef.nativeElement;
    elm.style.display = "block";

    if (this._clone) {
      this._currentMeasure.width = this._clone.offsetWidth;
      this._currentMeasure.height = this._clone.offsetHeight;
    } else if(opened){
      this._currentMeasure[this.otherDimension] = elm.offsetWidth;
      this._currentMeasure[this.dimension] = 0;
    }else{
      this._currentMeasure.width = elm.offsetWidth;
      this._currentMeasure.height = elm.offsetHeight;
    }

    const container = this.contentRef.nativeElement;
    this._targetMeasure.width = container.offsetWidth;
    this._targetMeasure.height = container.offsetHeight;

    console.debug("measure", this._currentMeasure, this._targetMeasure);
  }

  private animate(opened: boolean, duration: number) {
    this.setState(opened ? 'opening' : 'closing');
    var p = 1.0;
    if (this._player) {
      p = this._player.getPosition() / this._player.totalTime;
      this._player.pause();
      this._player.destroy();
    }

    this.measure(opened);
    if(p === 1.0){
      this.addAnimationClone();
    }

    const metadata = opened
      ? this._openAnim(duration * p)
      : this._closeAnim(duration * p);

    const factory = this.builder.build(metadata);
    const player = factory.create(this._clone);
    player.onStart(() =>
      opened ? this._openAnimStart() : this._closeAnimStart()
    );
    player.onDone(() => {
      opened ? this._openAnimEnd() : this._closeAnimEnd();
    });

    player.play();
    player.beforeDestroy = ()=>{
      this.destroyAnimationClone();
    }
  }

  private _openAnim(duration: number) {
    const startValue = this._currentMeasure[this.dimension];
    const endValue = this._targetMeasure[this.dimension];
    return [
      style({ [this.dimension]: startValue }),
     /* style({
        [this.otherDimension]: "100%", //this._targetMeasure[this.otherDimension],
      }),*/
      style({ overflow: "hidden" }),
      animate(`${duration}ms ease-out`, style({ [this.dimension]: endValue })),
    ];
  }
  private _closeAnim(duration: number) {
    const startValue = this._currentMeasure[this.dimension];
    const endValue = 0;
    return [
      style({ [this.dimension]: "*" }),
     /* style({
        [this.otherDimension]: "100%", //this._targetMeasure[this.otherDimension],
      }),*/
      style({ overflow: "hidden" }),
      animate(`${duration}ms ease-out`, style({ [this.dimension]: endValue })),
    ];
  }

  private _openAnimStart() {
    if (this._contentElement) {
      this._contentElement.style.position = `absolute`;
      this._contentElement.style[this.otherSide] = `0`;
      this._contentElement.style[this.dimension] = `${
        this._targetMeasure[this.dimension]
      }px`;
    }
  }
  private _openAnimEnd() {
    this.setState('open');
    this.destroyAnimationClone();
    const elm = this.elmRef.nativeElement;
    elm.style.display = "block";
  }
  private _closeAnimStart() {
    if (this._contentElement) {
      this._contentElement.style.position = `absolute`;
      this._contentElement.style[this.otherSide] = `0`;
      this._contentElement.style[this.dimension] = `${
        this._targetMeasure[this.dimension]
      }px`;
    }
  }

  private _closeAnimEnd() {
    this.setState('closed');
    const elm = this.elmRef.nativeElement;
    elm.style.display = "none";
    this.destroyAnimationClone();
  }

  private get otherSide(): FromSide {
    switch (this.from) {
      case "top":
        return "bottom";
      case "bottom":
        return "top";
      case "left":
        return "right";
      case "right":
        return "left";
    }
  }

  private get dimension(): Dimension {
    switch (this.from) {
      case "top":
      case "bottom":
        return "height";

      case "left":
      case "right":
        return "width";
    }
  }
  private get otherDimension(): Dimension {
    switch (this.from) {
      case "top":
      case "bottom":
        return "width";

      case "left":
      case "right":
        return "height";
    }
  }

  ngOnInit(): void {
    this._initialized = true;
    if (!this.opened) {
      this.animate(false, 0);
    }
  }
}
