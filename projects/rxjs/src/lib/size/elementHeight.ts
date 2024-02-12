import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { elementSize } from './elementSize';
import { documentElement } from '../util/documentElement';

/**
 * Creates an observable that emits the height of the given element.
 * @param { Element } element  - The element to observe for size changes (default: document.documentElement)
 * @returns {Observable<number>} An observable that emits the height of the given element.
 * @example
 * import { elementHeight } from '@cpangular/rxjs';
 *
 * elementHeight(document.body).subscribe((height) => {
 *  console.log(height);
 * });
 *
 */
export function elementHeight(element: Element | null = documentElement()): Observable<number> {
  return elementSize(element).pipe(
    map((s) => s.height),
    distinctUntilChanged(),
    shareReplay(1),
  );
}
