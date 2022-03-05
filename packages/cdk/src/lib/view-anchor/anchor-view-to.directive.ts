import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { IViewDirective } from "./IViewDirective";
import { ViewAnchorService } from "./view-anchor.service";


@Directive({
  selector: "[cpngAnchorViewTo]",
})
export class AnchorViewToDirective
  implements OnChanges, OnDestroy, IViewDirective
{
  private _attached: boolean = false;
  private _inlineFallback: boolean = true;

  @Input("cpngAnchorViewTo")
  public anchorViewTo?: string | symbol;

  @Input("cpngAnchorViewToInlineFallback")
  public get anchorViewToInlineFallback(): boolean {
    return this.inlineFallback;
  }
  public set anchorViewToInlineFallback(value: boolean) {
    this.inlineFallback = value;
  }

  @Input()
  public get inlineFallback(): boolean {
    return this._inlineFallback;
  }
  public set inlineFallback(value: boolean) {
    this._inlineFallback = value;
  }

  public viewRef: EmbeddedViewRef<any>;

  constructor(
    private readonly service: ViewAnchorService,
    private readonly viewContainer: ViewContainerRef,
    template: TemplateRef<any>
  ) {
    this.viewRef = viewContainer.createEmbeddedView(template);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const anchorViewToChange = changes["anchorViewTo"];
    if (anchorViewToChange) {
      this.service.viewAdded(this, anchorViewToChange.currentValue);
    }
    const inlineFallbackChange =
      changes["inlineFallback"] ?? changes["anchorViewToInlineFallback"];
    if (inlineFallbackChange) {
      if (!this._attached) {
        this._remove();
        if (this.inlineFallback) {
          this._addInline();
        }
      }
    }
  }

  public ngOnDestroy(): void {
    this._attached = false;
    this.service.viewRemoved(this);
    this._remove();
  }

  public removed(): void {
    this._attached = false;
    this._remove();
    if (this.inlineFallback) {
      this._addInline();
    }
  }

  public added(): void {
    this._attached = true;
  }

  private _remove() {
    this.viewRef.rootNodes.forEach((n) => n.remove());
  }

  private _addInline() {
    this.viewRef.rootNodes.forEach((n) => n.remove());
    const target = this.viewContainer.element.nativeElement as HTMLElement;
    this.viewRef.rootNodes.forEach((n) =>
      target.parentElement?.insertBefore(n, target)
    );
  }
}
