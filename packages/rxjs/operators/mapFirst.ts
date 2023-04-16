import { map, Observable } from 'rxjs';

/**
 * Rxjs operator that emits the first value that matches a check.
 * @param { ((value: T, checkIndex: number, streamIndex: number) => ((value: T, checkIndex: number, streamIndex: number) => R) | undefined)[] } checks - An array of checks to run on each value.
 * @param { R | ((value: T) => R) } defaultValue - The default value to emit if no checks match.
 * @returns An observable that emits the first value that matches a check.
 * @example
 * import { mapFirst } from '@cpangular/rxjs/operators';
 *
 * of(1, 2, 3, 5).pipe(
 * mapFirst([
 *  (value) => value === 1 ? (value) => "one" : undefined,
 *  (value) => value === 2 ? (value) => "two" : undefined,
 *  (value) => value === 3 ? (value) => "three" : undefined,
 *  (value) => value === 4 ? (value) => "four" : undefined
 * ], (value) => "unknown: " + value);
 * ).subscribe((value) => {
 * console.log(value);
 * });
 *
 * // Output:
 * // one
 * // two
 * // three
 * // unknown: 5
 *
 */

export function mapFirst<T, R>(
  checks: ((value: T, checkIndex: number, streamIndex: number) => ((value: T, checkIndex: number, streamIndex: number) => R) | undefined)[],
  defaultValue: R | ((value: T) => R)
): (source: Observable<T>) => Observable<R> {
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
        return typeof defaultValue === 'function' ? (defaultValue as (value: T) => R)(value) : defaultValue;
      })
    );
  };
}
