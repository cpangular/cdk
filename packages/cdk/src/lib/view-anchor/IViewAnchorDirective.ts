import { IViewDirective } from './IViewDirective';

export interface IViewAnchorDirective {
  removeView(view: IViewDirective): void;
  addView(view: IViewDirective): void;
  readonly viewCount: number;
}
