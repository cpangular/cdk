import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { ScrollBehavior } from './ScrollBehavior';

export class ScrollBehaviorWatcher {
  public readonly fixed$ = this.mode$.pipe(
    map((m) => m !== ScrollBehavior.SCROLL),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly hideOnScroll$ = this.mode$.pipe(
    map((m) => m === ScrollBehavior.FLOAT),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(public readonly mode$: Observable<ScrollBehavior>) {}
}
