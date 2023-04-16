import { Observable, map } from 'rxjs';

/**
 * Rxjs operator that emits a boolean array of the results of each check.
 * @param { ((data: TData) => boolean)[] } checks - An array of checks to run on each emitted value.
 * @returns An observable that emits a boolean array of the results of each check.
 * @example
 * import { matches } from '@cpangular/rxjs/operators';
 *
 * of({ name: 'John', age: 30 }, { name: 'Jane', age: 25 }).pipe(
 *   matches([
 *     (data) => data.name === 'John',
 *     (data) => data.age === 30
 *   ])
 * ).subscribe((value) => {
 *   console.log(value);
 * });
 *
 * // Output:
 * // [true, true]
 * // [false, false]
 *
 */

export function matches<TData>(checks: ((data: TData) => boolean)[]) {
  return (source: Observable<TData>) => {
    return source.pipe(
      map((data: TData) => {
        let results: boolean[] = [];
        for (const check of checks) {
          results.push(check(data));
        }
        return results;
      })
    );
  };
}
