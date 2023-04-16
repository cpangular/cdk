import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { elementSize } from './elementSize';


export function elementWidth(element: Element = document.documentElement): Observable<number> {
  return elementSize(element).pipe(
    map(s => s.width),
    distinctUntilChanged(),
    shareReplay(1)
  );
}
