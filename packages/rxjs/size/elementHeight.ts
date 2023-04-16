import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { elementSize } from './elementSize';


export function elementHeight(element: Element = document.documentElement): Observable<number> {
  return elementSize(element).pipe(
    map(s => s.height),
    distinctUntilChanged(),
    shareReplay(1)
  );
}
