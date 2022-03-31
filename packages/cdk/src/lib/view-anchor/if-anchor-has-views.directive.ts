import { Directive, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewAnchorService } from './view-anchor.service';
import { ViewAnchorId } from './ViewAnchorId';

@Directive({
  selector: '[cpngIfAnchorHasViews]',
})
export class IfAnchorHasViewsDirective implements OnChanges {
  private viewRef?: ViewRef;

  @Input('cpngIfAnchorHasViews')
  public ifAnchorsHaveView: ViewAnchorId | ViewAnchorId[] = [];

  private _sub: Subscription = new Subscription();
  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly template: TemplateRef<any>,
    private readonly service: ViewAnchorService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['ifAnchorsHaveView']) {
      this._sub.unsubscribe();
      this._sub = this.service.hasViewChange(this.ifAnchorsHaveView).subscribe((show) => this.update(show));
    }
  }

  private update(show: boolean) {
    if (show) {
      if (!this.viewRef) {
        this.viewRef = this.viewContainer.createEmbeddedView(this.template, {});
      }
      this.viewRef.detectChanges();
    } else {
      this.viewContainer.clear();
      this.viewRef = undefined;
    }
  }
}
