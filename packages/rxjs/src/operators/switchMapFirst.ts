import { Observable, isObservable, of, switchMap } from 'rxjs';
import { TransformFn } from './types/TransformFn';
import { TransformOperation } from './types/TransformOperation';

/**
 * A Function that transforms a value of type T into an observable of type R or undefined if the transform should not apply.
 * @template T The value to transform.
 * @template R The result of the transform.
 *
 */
export type SwitchTransformFn<T, R> = TransformFn<T, Observable<R>>;

/**
 * Rxjs operator that switches to the first observable returned by a transform.
 * @param { SwitchTransformFn<T, R>[] } transforms - An array of transforms to run on each emitted value.
 * The transform function should return an observable if the transform should be applied.
 * If the transform does not apply, the transform function should return undefined.
 * If no transforms match, the defaultValue observable is used.
 * @param { Observable<R> | TransformFn<T, Observable<R>> } defaultValue - The defaultValue observable is used if no transforms match.
 * @returns the first observable returned by a transform or the defaultValue observable.
 * @template T The type of value to transform.
 * @template R The type of result of the transform.
 * @example
 * import { of } from 'rxjs';
 * import { switchMapFirst } from '@cpangular/rxjs';
 *
 * of(1, 2, 3, 5).pipe(
 *   switchMapFirst([
 *     (value) => value === 1 ? (value) => of(`one: ${value}`) : undefined,
 *     (value) => value === 2 ? (value) => of(`two: ${value}`) : undefined,
 *     (value) => value === 3 ? (value) => of(`three: ${value}`) : undefined,
 *     (value) => value === 4 ? (value) => of(`four: ${value}`) : undefined
 *   ], (value) => of(`unknown: ${value}`)));
 * ).subscribe((value) => {
 *   console.log(value);
 * });
 *
 * // Output:
 * // one: 1
 * // two: 2
 * // three: 3
 * // unknown: 5
 *
 */
export function switchMapFirst<T, R>(
  transforms: SwitchTransformFn<T, R>[],
  defaultValue: Observable<R> | TransformFn<T, Observable<R>>
): TransformOperation<T, R | undefined> {
  return (source: Observable<T>) => {
    return source.pipe(
      switchMap((value) => {
        for (const check of transforms) {
          const result = check(value);
          if (isObservable(result)) {
            return result;
          }
        }
        const o = typeof defaultValue === 'function' ? (defaultValue as TransformFn<T, Observable<R>>)(value) : defaultValue;
        if (isObservable(o)) {
          return o;
        }
        return of(undefined);
      })
    );
  };
}
