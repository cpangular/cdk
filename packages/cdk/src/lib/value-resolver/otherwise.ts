import { Observable, shareReplay } from 'rxjs';
import { IfThen } from './IfThen';

export function otherwise<T>(value: T): IfThen<T> {
  return {
    condition: new Observable<boolean>((s) => {
      s.next(true);
    }).pipe(shareReplay(1)),
    thenValue: value,
  };
}
