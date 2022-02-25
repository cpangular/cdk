import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { filter, Subscription } from "rxjs";
import { ViewAnchorService } from "./view-anchor.service";

@Directive({
  selector: "[cpngHideWhenNoViews]",
  exportAs: "viewAnchor",
})
export class HideWhenNoViewsDirective implements OnChanges {
  @Input("cpngHideWhenNoViews")
  public viewNames: string | symbol | Array<string | symbol> = [];

  private _sub: Subscription = new Subscription();
  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly service: ViewAnchorService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["viewNames"]) {
      this._sub.unsubscribe();
      const names = Array.isArray(this.viewNames)
        ? this.viewNames
        : [this.viewNames ?? ""];
      this.checkViewCount();
      this._sub = this.service.anchorUpdated
        .pipe(filter((a) => names.indexOf(a) !== -1))
        .subscribe((anchorName) => {
          this.checkViewCount();
        });
    }
  }

  private checkViewCount() {
    const names = Array.isArray(this.viewNames)
      ? this.viewNames
      : [this.viewNames ?? ""];
    const count = this.service.anchors
      .where((a) => names.indexOf(a.id) !== -1)
      .sum((a) => a.directive.viewCount);
    if (count === 0) {
      this.elementRef.nativeElement.style.display = "none";
    } else {
      this.elementRef.nativeElement.style.display = "";
    }
    console.log("checkViewCount", count);
  }
}
