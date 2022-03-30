import { Injectable, Optional, SkipSelf } from '@angular/core';
import Enumerable from 'linq';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, shareReplay } from 'rxjs';
import { IViewAnchorDirective } from './IViewAnchorDirective';
import { IViewDirective } from './IViewDirective';
import { ViewAnchorId } from './ViewAnchorId';

interface ViewAnchorRegistration {
  id: ViewAnchorId;
  directive: IViewAnchorDirective;
}

interface ViewDirectiveRegistration {
  id: ViewAnchorId;
  directive: IViewDirective;
}

@Injectable({
  providedIn: 'root',
})
export class ViewAnchorService {
  private _views: ViewDirectiveRegistration[] = [];
  private _anchors: ViewAnchorRegistration[] = [];

  private _viewCounts: Map<ViewAnchorId, BehaviorSubject<number>> = new Map();

  private _viewCountSubject(id: ViewAnchorId): BehaviorSubject<number> {
    if (!this._viewCounts.has(id)) {
      this._viewCounts.set(id, new BehaviorSubject(0));
    }
    return this._viewCounts.get(id)!;
  }

  public viewCountChange(id: ViewAnchorId | ViewAnchorId[]) {
    const ids = Array.isArray(id) ? id : [id];
    const counts = ids.map((i) => this._viewCountSubject(i));
    return combineLatest(counts).pipe(
      map((c) => c.reduce((v, c) => v + c)),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  public viewCount(id: ViewAnchorId | ViewAnchorId[]) {
    const ids = Array.isArray(id) ? id : [id];
    return this.views.count((v) => ids.indexOf(v.id) !== -1);
  }

  public hasViewChange(id: ViewAnchorId | ViewAnchorId[]) {
    return this.viewCountChange(id).pipe(
      map((c) => c > 0),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  public hasView(id: ViewAnchorId | ViewAnchorId[]) {
    return this.viewCount(id) > 0;
  }

  private get views() {
    return Enumerable.from(this._views);
  }

  private get anchors() {
    return Enumerable.from(this._anchors);
  }

  private ttt = Math.random();

  public constructor(@Optional() @SkipSelf() private readonly parent: ViewAnchorService) {}

  private findViewByDirective(directive: IViewDirective) {
    return this.views.firstOrDefault((v) => {
      return v.directive === directive;
    });
  }

  private findAnchorById(id: ViewAnchorId) {
    return this.anchors.firstOrDefault((v) => {
      return v.id === id;
    });
  }

  private findAnchorByDirective(directive: IViewAnchorDirective) {
    return this.anchors.firstOrDefault((v) => {
      return v.directive === directive;
    });
  }

  public anchorAdded(directive: IViewAnchorDirective, id: ViewAnchorId) {
    const currentAnchor = this.findAnchorByDirective(directive);
    if (currentAnchor && currentAnchor.id === id) {
      return;
    } else if (currentAnchor) {
      this._removeAnchor(currentAnchor);
    }
    const otherAnchor = this.findAnchorById(id);
    if (otherAnchor) {
      this._removeAnchor(otherAnchor);
    }

    this._anchors.push({
      id,
      directive,
    });

    this.views
      .where((v) => v.id === id)
      .forEach((v) => {
        directive.addView(v.directive);
        v.directive.added(id);
      });
  }

  public anchorRemoved(directive: IViewAnchorDirective) {
    const currentAnchor = this.findAnchorByDirective(directive);
    if (currentAnchor) {
      this._removeAnchor(currentAnchor);
    }
  }

  private _removeAnchor(anchor: ViewAnchorRegistration) {
    this._anchors = this._anchors.filter((a) => a.directive !== anchor.directive);
    this.views
      .where((v) => v.id === anchor.id)
      .forEach((v) => {
        anchor.directive.removeView(v.directive);
        v.directive.removed();
      });
  }

  public viewAdded(directive: IViewDirective, id: ViewAnchorId) {
    const currentView = this.findViewByDirective(directive);
    const oldId = currentView?.id ?? undefined;

    if (oldId !== id) {
      if (!oldId && id) {
        //add
        this._views.push({
          id,
          directive,
        });
        const anchor = this.findAnchorById(id);
        if (anchor) {
          anchor.directive.addView(directive);
          directive.added(id);
        }
        const count$ = this._viewCountSubject(id);
        count$.next(count$.value + 1);
      } else if (oldId && !id) {
        // remove
        this._views = this._views.filter((v) => v.id !== oldId);
        const anchor = this.findAnchorById(id);
        if (anchor) {
          anchor.directive.removeView(directive);
          directive.removed();
        }
        const count$ = this._viewCountSubject(id);
        count$.next(count$.value - 1);
      } else if (oldId && id) {
        // move
        currentView!.id = id;
        const oldAnchor = this.findAnchorById(oldId!);
        const anchor = this.findAnchorById(id);
        oldAnchor?.directive.removeView(directive);
        anchor?.directive.addView(directive);

        const countOld$ = this._viewCountSubject(oldId);
        countOld$.next(countOld$.value - 1);
        const countNew$ = this._viewCountSubject(id);
        countNew$.next(countNew$.value + 1);
      }
    }
  }

  public viewRemoved(directive: IViewDirective) {
    const currentView = this.findViewByDirective(directive);
    if (currentView) {
      this._removeView(currentView);
    }
  }

  private _removeView(view: ViewDirectiveRegistration) {
    this._views = this._views.filter((v) => v !== view);
    const anchor = this.findAnchorById(view.id);
    anchor?.directive.removeView(view.directive);
    view.directive.removed();
    const count$ = this._viewCountSubject(view.id);
    count$.next(count$.value - 1);
  }
}
