import { mapFirst } from '@cpangular/rxjs';
import { Observable, distinctUntilChanged, shareReplay } from 'rxjs';
import { Size } from '../size';
import { BreakpointEntry } from './BreakpointEntry';
import { BreakpointOperator } from './BreakpointOperator';

/**
 * A rxjs operator that transforms an observable of type {@link Size} into a value of observable R.
 * @template TValue The type of the value to return.
 * @param { BreakpointEntry<TValue>[] } ifThens - An array of {@link BreakpointEntry} to run on each emitted value.
 * @returns An observable that emits the result of the first transform that returns a value function.
 * @example
 * import { of } from 'rxjs';
 * import { mapBreakpoints } from '@cpangular/rxjs/breakpoints';
 *
 * of({ width: 100, height: 100 }, { width: 200, height: 200 }, { width: 1, height: 1 }).pipe(
 *   mapBreakpoints(
 *     {
 *       check: (size: Size) => size.width === 100,
 *       then: (size: Size) => 'Hello World'
 *     },
 *     {
 *       check: (size: Size) => size.width === 200,
 *       then: (size: Size) => 'Goodbye World'
 *     },
 *     otherwise('Hello?')
 *   )
 * ).subscribe((value) => {
 *   console.log(value);
 * });
 *
 * // Output:
 * // Hello World
 * // Goodbye World
 * // Hello?
 */


export function mapBreakpoints<TValue = unknown>(...ifThens: BreakpointEntry<TValue>[]): BreakpointOperator {
  const mapped = mapFirst<Size, TValue>(
    ifThens.map((ifThen) => (condition: Size) => {
      if (ifThen.check(condition)) {
        return ifThen.then;
      }
      return undefined;
    }),
    undefined as TValue
  );
  return (source: Observable<Size>) => {
    return mapped(source).pipe(distinctUntilChanged(), shareReplay(1));
  };
}
