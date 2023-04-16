import { distinctUntilChanged, map, Observable, shareReplay } from "rxjs";
import { elementSize } from "./elementSize";

/**
  * Creates an observable that emits the height of the given element.
  * @param { Element } element  - The element to observe for size changes (default: document.documentElement)
  * @returns {Observable<number>} An observable that emits the height of the given element.
  * @example
  * import { elementHeight } from '@cpangular/rxjs/size';
  * 
  * elementHeight(document.body).subscribe((height) => {
  *  console.log(height);
  * });
  * 
 */
export function elementHeight(
  element: Element = document.documentElement
): Observable<number> {
  return elementSize(element).pipe(
    map((s) => s.height),
    distinctUntilChanged(),
    shareReplay(1)
  );
}
