import {
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    Type,
    ViewContainerRef,
  } from "@angular/core";
  import { IViewAnchorDirective } from "./IViewAnchorDirective";
  import { IViewDirective } from "./IViewDirective";
  import { ViewAnchorService } from "./view-anchor.service";
  
  @Directive({
    selector: "ng-container[cpngViewAnchor]",
    exportAs: "viewAnchor",
  })
  export class ViewAnchorDirective
    implements IViewAnchorDirective, OnChanges, OnDestroy
  {
    @Input("cpngViewAnchor")
    public id!: string | symbol;
  
    private _views: IViewDirective[] = [];
    private _wrappersByView: Map<IViewDirective, ComponentRef<any>> = new Map();
  
    private _wrapperRefs: ComponentRef<any>[] = [];
    private _wrapperComponent?: Type<any>;
  
    @Input()
    public get wrapperComponent(): Type<any> | undefined {
      return this._wrapperComponent;
    }
    public set wrapperComponent(value: Type<any> | undefined) {
      this._wrapperComponent = value;
    }
  
    public constructor(
      private readonly service: ViewAnchorService,
      private readonly viewContainer: ViewContainerRef,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private readonly componentFactoryResolver: ComponentFactoryResolver
    ) {}
  
    public ngOnChanges(changes: SimpleChanges): void {
      const idChange = changes["id"];
      if (idChange) {
        const id = idChange.currentValue;
        if (id) {
          this.service.anchorAdded(this, idChange.currentValue);
        } else {
          this.service.anchorRemoved(this);
        }
      }
  
      const wrapperChange = changes["wrapperComponent"];
      if (wrapperChange) {
        if (!wrapperChange.firstChange) {
          this.updateWrappers();
        }
      }
    }
  
    public ngOnDestroy(): void {
      this.service.anchorRemoved(this);
    }
  
    public addView(view: IViewDirective): void {
      this._views.push(view);
      this.addViewNodes(view);
      this.changeDetectorRef.detectChanges();
    }
  
    public removeView(view: IViewDirective) {
      const idx = this._views.indexOf(view);
      if (idx !== -1) {
        this._views.splice(idx, 1);
      }
      this.removeViewNodes(view);
      this.changeDetectorRef.detectChanges();
    }
  
    private addViewNodes(view: IViewDirective) {
      if (this.wrapperComponent) {
        const projectedNodes = this.nodesToProjectableNodes(view);
        const cRef = this.viewContainer.createComponent(this.wrapperComponent, {
          projectableNodes: projectedNodes,
        });
        this._wrapperRefs.push(cRef);
        this._wrappersByView.set(view, cRef);
      } else {
        const target = this.viewContainer.element.nativeElement as HTMLElement;
        const nodes = view.viewRef.rootNodes;
        nodes.forEach((n) => target.parentElement?.insertBefore(n, target));
      }
    }
  
    private nodesToProjectableNodes(view: IViewDirective) {
      let nodes = [...view.viewRef.rootNodes];
      if (!this.wrapperComponent) {
        return [nodes];
      }
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        this.wrapperComponent
      );
      let selectors = factory.ngContentSelectors;
  
      const projectedNodes = selectors
        .map((s) => {
          if (s !== "*") {
            const matches = nodes.filter((node) =>
              node.matches ? node.matches(s) : false
            );
            nodes = nodes.filter((n) => matches.indexOf(n) === -1);
            return matches;
          }
          return s;
        })
        .map((s) => {
          if (s === "*") {
            return [...nodes];
          }
          return s;
        });
      return projectedNodes;
    }
  
    private removeViewNodes(view: IViewDirective) {
      view.viewRef.rootNodes.forEach((n) => n.remove());
      const wrapper = this._wrappersByView.get(view);
      if (wrapper) {
        wrapper.destroy();
        this._wrappersByView.delete(view);
      }
    }
  
    private updateWrappers() {
      for (const view of this._views) {
        this.removeViewNodes(view);
        this.addViewNodes(view);
      }
    }
  
    public get viewCount() {
      return this._views.length;
    }
  }
  