import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { Size } from './Size';


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
    map(rect => ({ width: rect.width, height: rect.height } as Size)),
    distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height),
    shareReplay(1)
  );
}
