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
  selector: "[cpngProjectToAnchor]",
})
export class ProjectToAnchorDirective
  implements OnChanges, OnDestroy, IViewDirective
{
  private _attached: boolean = false;
  private _inlineFallback: boolean = true;
  private _viewRef: EmbeddedViewRef<any>;

  @Input("cpngProjectToAnchor")
  public projectToAnchor?: string | symbol;

  @Input("cpngProjectToAnchorInlineFallback")
  public get inlineFallback(): boolean {
    return this._inlineFallback;
  }
  public set inlineFallback(value: boolean) {
    this._inlineFallback = value;
  }

  constructor(
    private readonly service: ViewAnchorService,
    private readonly viewContainer: ViewContainerRef,
    public readonly templateRef: TemplateRef<any>
  ) {
    this._viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
  }

  getViewNodes(): Element[] {
    return this._viewRef.rootNodes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const projectToAnchorChange = changes["projectToAnchor"];
    if (projectToAnchorChange) {
      this.service.viewAdded(this, projectToAnchorChange.currentValue);
    }
    const inlineFallbackChange =
      changes["inlineFallback"] ?? changes["projectToAnchorInlineFallback"];
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
    this._viewRef?.rootNodes.forEach((n) => n.remove());
  }

  private _addInline() {
    this._viewRef?.rootNodes.forEach((n) => n.remove());
    const target = this.viewContainer.element.nativeElement as HTMLElement;
    this._viewRef?.rootNodes.forEach((n) =>
      target.parentElement?.insertBefore(n, target)
    );
  }
}
