import { IResolvable } from "./IResolvable";
import { Observable, of, shareReplay } from "rxjs";
import { isValueResolver } from "./IValueResolver";

export function observe<T>(
  resolvable: IResolvable<T>
): Observable<T | undefined> {
  if (isValueResolver(resolvable)) {
    return resolvable.valueChange;
  }
  return of(resolvable).pipe(shareReplay(1));
}
