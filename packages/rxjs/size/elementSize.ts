import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { Size } from './Size';

/**
 * Creates an observable that emits the size of the given element.
 * @param { Element } element  - The element to observe for size changes (default: document.documentElement)
 * @returns {Observable<Size>} An observable that emits the size of the given element.
 * @example
 * import { elementSize } from '@cpangular/rxjs/size';
 *
 * elementSize(document.body).subscribe((size) => {
 *  console.log(size);
 * });
 *
 */

export function elementSize(element: Element = document.documentElement): Observable<Size> {
  return new Observable<DOMRect>((sub) => {
    const obs = new ResizeObserver((v) => sub.next(v.pop()?.contentRect));
    const rect = element.getBoundingClientRect();
    sub.next(rect);
    obs.observe(element, { box: 'border-box' });
    return () => {
      obs.disconnect();
    };
  }).pipe(
    map((rect) => ({ width: rect.width, height: rect.height } as Size)),
    distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height),
    shareReplay(1)
  );
}
