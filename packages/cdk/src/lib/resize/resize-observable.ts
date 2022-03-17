import { distinctUntilChanged, Observable, shareReplay } from "rxjs";

export class ResizeObservable extends Observable<ResizeObserverEntry> {
  constructor(element: Element, box?: ResizeObserverBoxOptions) {
    super((subject) => {
      const resizeObs = new ResizeObserver((e, _) => {
        subject.next(e[0]);
      });
      resizeObs.observe(element, {
        box,
      });
      return () => {
        resizeObs.disconnect();
      };
    });

    return this.pipe(
      distinctUntilChanged(
        (a, b) =>
          a.contentRect.width === b.contentRect.width &&
          a.contentRect.height === b.contentRect.height
      ),
      shareReplay(1)
    );
  }
}
