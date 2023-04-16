import { distinctUntilChanged, map, Observable, shareReplay } from "rxjs";
import { elementSize } from "./elementSize";

/**
 * Creates an observable that emits the width of the given element.
 * @param { Element } element  - The element to observe for size changes (default: document.documentElement)
 * @returns {Observable<number>} An observable that emits the width of the given element.
 * @example
 * import { elementWidth } from '@cpangular/rxjs/size';
 * 
 * elementWidth(document.body).subscribe((width) => {
 *   console.log(width);
 * });
 *  
 */

export function elementWidth(
  element: Element = document.documentElement
): Observable<number> {
  return elementSize(element).pipe(
    map((s) => s.width),
    distinctUntilChanged(),
    shareReplay(1)
  );
}
