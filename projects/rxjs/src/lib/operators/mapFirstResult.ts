import { Observable, map } from 'rxjs';
import { TransformFn } from './types/TransformFn';
import { TransformOperation } from './types/TransformOperation';

/**
 * Rxjs operator that emits the first transform that returns a value.
 * @param { TransformFn<T, R>[] } transform - An array of transforms to run on each emitted value.
 * The transform function should return a value if the transform should be applied.
 * If the transform does not apply, the transform function should return undefined.
 * If no transforms match, the defaultValue is returned.
 * @param { R } defaultValue - The default value to emit if no transforms match.
 * @returns An observable that emits the result of the first transform that returns a value.
 * @example
 * import { of } from 'rxjs';
 * import { mapFirstResult } from '@cpangular/rxjs';

 * of(1, 2, 3, 5).pipe(
 *   mapFirstResult([
 *     (value) => value === 1 ? "one" : undefined,
 *     (value) => value === 2 ? "two" : undefined,
 *     (value) => value === 3 ? "three" : undefined,
 *     (value) => value === 4 ? "four" : undefined
 *   ], (value) => `unknown: ${value}`));
 * ).subscribe((value) => {
 *   console.log(value);
 * });
 *
 * // Output:
 * // one
 * // two
 * // three
 * // unknown: 5
 *
 */

export function mapFirstResult<T, R>(
  transform: TransformFn<T, R>[],
  defaultValue?: R | TransformFn<T, R>,
): TransformOperation<T, R | undefined> {
  return (source: Observable<T>) => {
    return source.pipe(
      map((value: T) => {
        for (const check of transform) {
          const result = check(value);
          if (result !== undefined) {
            return result;
          }
        }
        return typeof defaultValue === 'function'
          ? (defaultValue as TransformFn<T, R>)(value)
          : defaultValue;
      }),
    );
  };
}
