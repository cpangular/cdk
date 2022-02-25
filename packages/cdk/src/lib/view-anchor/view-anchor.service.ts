import { Injectable } from "@angular/core";
import { IViewAnchorDirective } from "./IViewAnchorDirective";
import { IViewDirective } from "./IViewDirective";
import Enumerable from 'linq';
import { Observable, Subject } from "rxjs";

interface ViewAnchor {
  id: string | symbol;
  directive: IViewAnchorDirective;
}

interface View {
  anchor: string | symbol | undefined;
  allowedViewAnchors: Array<string | symbol>;
  directive: IViewDirective;
}

@Injectable({
  providedIn: "root",
})
export class ViewAnchorService {
  private _views: View[] = [];
  private _anchors: ViewAnchor[] = [];

  private _viewsEnum = Enumerable.from(this._views);
  private _anchorsEnum = Enumerable.from(this._anchors);

  public get views():Enumerable.IEnumerable<View>{
    return this._viewsEnum;
  }
  public get anchors():Enumerable.IEnumerable<ViewAnchor>{
    return this._anchorsEnum;
  }

  private _anchorUpdated:Subject<string | symbol> = new Subject();

  private getViewByDirective(d: IViewDirective) {
    return this._views.find((v) => v.directive === d);
  }

  private getViewAnchorByDirective(d: IViewAnchorDirective) {
    return this._anchors.find((v) => v.directive === d);
  }
  private findViewsByAllowedViewAnchorId(anchorId: string | symbol) {
    return this._views.filter((v) => v.allowedViewAnchors.indexOf(anchorId) !== -1);
  }

  private findViewsByViewAnchorId(anchorId: string | symbol) {
    return this._views.filter((v) => v.anchor === anchorId);
  }

  private getViewAnchorById(id: string | symbol) {
    return this._anchors.find((v) => v.id === id);
  }

  public get anchorUpdated(): Observable<string | symbol>{
    return this._anchorUpdated;
  }

  public addView(view: IViewDirective, allowedViewAnchors: Array<string | symbol>) {
    const currentView = this.getViewByDirective(view);

    const oldAnchorId = currentView?.anchor ?? undefined;
    const newAnchorId =
      allowedViewAnchors.find((v) => !!this._anchors.find((p) => p.id === v)) ?? undefined;

    if (oldAnchorId !== newAnchorId) {
      if (!oldAnchorId && newAnchorId) {
        // add
        console.debug(
          `[ViewAnchorService] Added view to anchor '${newAnchorId.toString()}'`
        );
        const newAnchor = this.getViewAnchorById(newAnchorId);
        if(newAnchor){
          newAnchor.directive.addView(view);
          this._anchorUpdated.next(newAnchor.id);
        }
        view.added(newAnchorId);
      } else if (oldAnchorId && !newAnchorId) {
        // remove
        console.debug(
          `[ViewAnchorService] Removed view from anchor '${oldAnchorId.toString()}'`
        );
        const oldAnchor = this.getViewAnchorById(oldAnchorId);
        if(oldAnchor){
          oldAnchor.directive.removeView(view);
          this._anchorUpdated.next(oldAnchor.id);
        }
        view.removed();
      } else if (oldAnchorId && newAnchorId) {
        // move
        console.debug(
          `[ViewAnchorService] Moved view from anchor '${oldAnchorId.toString()}' to '${newAnchorId.toString()}'`
        );
        const oldAnchor = this.getViewAnchorById(oldAnchorId);
        const newAnchor = this.getViewAnchorById(newAnchorId);
        
        if(oldAnchor){
          oldAnchor.directive.removeView(view);
          this._anchorUpdated.next(oldAnchor.id);
        }

        if(newAnchor){
          newAnchor.directive.addView(view);
          this._anchorUpdated.next(newAnchor.id);
        }
      }
    }
    if (currentView) {
      currentView.anchor = newAnchorId;
      currentView.allowedViewAnchors = allowedViewAnchors;
    } else {
      this._views.push({
        anchor: newAnchorId,
        allowedViewAnchors: allowedViewAnchors,
        directive: view,
      });
      if (!newAnchorId) {
        console.debug(
          `[ViewAnchorService] Added view with no anchor matching '${allowedViewAnchors.join(
            "', '"
          )}'`
        );
        view.added(undefined);
      }
    }
  }

  public destroyView(view: IViewDirective) {
    const currentView = this.getViewByDirective(view);
    const oldAnchorId = currentView?.anchor ?? undefined;
    this._views = this._views.filter((v) => v.directive !== view);
    if (oldAnchorId) {
      console.debug(
        `[ViewAnchorService] Removed view from anchor '${oldAnchorId.toString()}'`
      );
      const oldAnchor = this.getViewAnchorById(oldAnchorId);
      
      if(oldAnchor){
        oldAnchor?.directive.removeView(view);
        this._anchorUpdated.next(oldAnchor.id);
      }
      view.removed();
    }
  }

  public addViewAnchor(viewAnchor: IViewAnchorDirective, id: string | symbol) {
    const currentViewAnchor = this.getViewAnchorByDirective(viewAnchor);

    if (!currentViewAnchor) {
      //add
      console.debug(`[ViewAnchorService] Added view anchor '${id.toString()}'`);
      this._anchors.push({
        id: id,
        directive: viewAnchor,
      });
      this.findViewsByAllowedViewAnchorId(id).forEach((v) => {
        this.addView(v.directive, v.allowedViewAnchors);
      });
    } else if (currentViewAnchor && currentViewAnchor.id !== id) {
      // rename
      console.debug(
        `[ViewAnchorService] Renamed view anchor from '${currentViewAnchor.id.toString()}' to '${id.toString()}'`
      );
      currentViewAnchor.id = id;
      this.findViewsByAllowedViewAnchorId(id).forEach((v) => {
        this.addView(v.directive, v.allowedViewAnchors);
      });
    }
  }

  public removeViewAnchor(viewAnchor: IViewAnchorDirective) {
    const currentViewAnchor = this.getViewAnchorByDirective(viewAnchor);
    if (currentViewAnchor) {
      console.debug(
        `[ViewAnchorService] Removed view anchor '${currentViewAnchor.id.toString()}'`
      );
      this._anchors = this._anchors.filter((p) => p.directive !== viewAnchor);

      this.findViewsByViewAnchorId(currentViewAnchor.id).forEach((v) => {
        this.addView(v.directive, v.allowedViewAnchors);
      });
    }
  }

  public getViewCount(id: string | symbol){
    const va = this.getViewAnchorById(id);
    return va?.directive.viewCount ?? 0;
  }
}
