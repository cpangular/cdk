import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewAnchorService } from './view-anchor.service';
import { ViewAnchorId } from './ViewAnchorId';

@Directive({
  selector: '[cpngHideWhenNoViews]',
})
export class HideWhenNoViewsDirective implements OnChanges {
  @Input('cpngHideWhenNoViews')
  public viewNames: ViewAnchorId | ViewAnchorId[] = [];

  private _sub: Subscription = new Subscription();
  constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly service: ViewAnchorService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['viewNames']) {
      this._sub.unsubscribe();
      this._sub = this.service.hasViewChange(this.viewNames).subscribe((show) => {
        this.checkViewCount(show);
      });
    }
  }

  private checkViewCount(show: boolean) {
    if (show) {
      this.elementRef.nativeElement.style.display = '';
    } else {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }
}
