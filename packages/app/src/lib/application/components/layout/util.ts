import { combineLatest, distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';

export function anyTrue$(conditions: Observable<boolean>[]) {
  return combineLatest(conditions).pipe(
    map((c) => c.some((v) => v === true)),
    distinctUntilChanged(),
    shareReplay(1)
  );
}

export function isEqual$(obs: Observable<any>, toValue: any) {
  return obs.pipe(map((v) => v === toValue));
}

export function not$(obs: Observable<boolean>): Observable<boolean> {
  return obs.pipe(map((v) => !v));
}
