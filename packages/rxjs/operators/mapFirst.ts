import { map, Observable } from "rxjs";


export function mapFirst<T, R>(checks: ((value: T, checkIndex: number, streamIndex: number) => ((value: T, checkIndex: number, streamIndex: number) => R) | undefined)[], defaultValue: R) {
  return (source: Observable<T>) => {
    let streamIndex = -1;
    return source.pipe(
      map((value: T) => {
        streamIndex++;
        let checkIndex = -1;
        for (const check of checks) {
          checkIndex++;
          const result = check(value, checkIndex, streamIndex);
          if (result) {
            return result(value, checkIndex, streamIndex);
          }
        }
        return defaultValue;
      })
    );
  };
}
