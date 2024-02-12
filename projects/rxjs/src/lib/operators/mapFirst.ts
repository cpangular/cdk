import { map, Observable, switchMap } from 'rxjs';
import { mapFirstResult } from './mapFirstResult';
import { TransformFn } from './types/TransformFn';
import { TransformOperation } from './types/TransformOperation';

/**
 * A function that transforms a value. The transform function should return a value function if the transform should be applied.
 * If the transform does not apply, the transform function should return undefined.
 *
 * @template T The value to transform.
 * @template R The result of the transform.
 */

export type ValueTransformFn<T, R> = TransformFn<T, TransformFn<T, R>>;

/**
 * Rxjs operator that emits the first transform that returns a value function.
 * The value function is then applied to the value and the result is emitted.
 * @param { ValueTransformFn<T, R>[] } transforms - An array of transforms to run on each emitted value.
 * The transform function should return a value function if the transform should be applied.
 * If the transform does not apply, the transform function should return undefined.
 * If no transforms match, the defaultValue is returned.
 * @param { R | TransformFn<T, R> } defaultValue - The default value to emit if no transforms match.
 * @returns An observable that emits the result of the first transform that returns a value function.
 * @example
 * import { of } from 'rxjs';
 * import { mapFirst } from '@cpangular/rxjs';
 *
 * of(1, 2, 3, 5).pipe(
 *  mapFirst([
 *   (value) => value === 1 ? (value) => `one: ${value}` : undefined,
 *  (value) => value === 2 ? (value) => `two: ${value}` : undefined,
 * (value) => value === 3 ? (value) => `three: ${value}` : undefined,
 * (value) => value === 4 ? (value) => `four: ${value}` : undefined
 * ], (value) => `unknown: ${value}`));
 * ).subscribe((value) => {
 *  console.log(value);
 * });
 *
 * // Output:
 * // one: 1
 * // two: 2
 * // three: 3
 * // unknown: 5
 *
 */

export function mapFirst<T, R>(
  transforms: ValueTransformFn<T, R>[],
  defaultValue: R | TransformFn<T, R>,
): TransformOperation<T, R | undefined> {
  return (source: Observable<T>) => {
    return source.pipe(
      switchMap((value) =>
        mapFirstResult(transforms)(source).pipe(
          map((transform) =>
            transform
              ? transform(value)
              : typeof defaultValue === 'function'
                ? (defaultValue as TransformFn<T, R>)(value)
                : defaultValue,
          ),
        ),
      ),
    );
  };
}
