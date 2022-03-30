import { distinctUntilChanged, Observable, shareReplay, Subscription } from 'rxjs';
import { IfThen } from './IfThen';

export function when<T>(...ifThens: IfThen<T>[]): Observable<T> {
  const conditionResults: boolean[] = [];
  return new Observable<T>((sub) => {
    const subscriptions = new Subscription();
    let timer: any | undefined = undefined;
    function invalidate() {
      const idx = conditionResults.findIndex((v) => v);
      if (idx !== -1) {
        sub.next(ifThens[idx].thenValue);
      }
      timer = undefined;
    }
    for (let i = 0; i < ifThens.length; i++) {
      const ifThen = ifThens[i];
      subscriptions.add(
        ifThen.condition.subscribe((r) => {
          conditionResults[i] = r;
          if (!timer) {
            timer = setTimeout(invalidate, 0);
          }
        })
      );
    }
    return () => {
      subscriptions.unsubscribe();
    };
  }).pipe(distinctUntilChanged(), shareReplay(1));
}
