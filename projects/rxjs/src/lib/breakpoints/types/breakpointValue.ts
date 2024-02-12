import { Observable } from 'rxjs';
import { elementSize } from '../size';
import { mapBreakpoints } from './mapBreakpoints';
import { BreakpointCondition } from './types/BreakpointCondition';

/**
 * Creates an observable that emits the result of the first breakpoint that matches.
 * @template TValue The type of the value to return.
 * @param { HTMLElement } element - The element to observe.
 * @param { BreakpointCondition<TValue>[] } ifThens - An array of {@link BreakpointCondition}'s to check each time the element size changes.
 * @returns An observable that emits the result of the first breakpoint that matches.
 * @example
 * import { breakpointValue } from '@cpangular/rxjs';
 * import { ifThen, otherwise } from '@cpangular/rxjs';
 *
 * const screenSize$ = breakpointValue(
 *  document.body,
 *  ifThen((body: Size) => body.width < 500, 'Small'),
 *  ifThen((body: Size) => body.width >= 500 && body.width < 1400, () => 'Medium'),
 *  otherwise('Large')
 *);
 *
 */

export function breakpointValue<TValue>(
  element: HTMLElement,
  ...ifThens: BreakpointCondition<TValue>[]
): Observable<TValue | undefined>;
/**
 * Creates an observable that emits the result of the first breakpoint that matches.
 * @template TValue The type of the value to return.
 * @param { BreakpointCondition<TValue>[] } ifThens - An array of {@link BreakpointCondition}'s to check each time the window size changes.
 * @returns An observable that emits the result of the first breakpoint that matches.
 * @example
 * import { breakpointValue } from '@cpangular/rxjs';
 * import { ifThen, otherwise } from '@cpangular/rxjs';
 *
 * const screenSize$: Observable<string> = breakpointValue(
 *  ifThen((body: Size) => body.width < 500, 'Small'),
 *  ifThen((body: Size) => body.width >= 500 && body.width < 1400, () => 'Medium'),
 *  otherwise('Large')
 * );
 *
 */

export function breakpointValue<TValue>(
  ...ifThens: BreakpointCondition<TValue>[]
): Observable<TValue | undefined>;
export function breakpointValue<TValue>(
  ...rest: any[]
): Observable<TValue | undefined> {
  const element = rest[0] instanceof HTMLElement ? rest.shift() : undefined;
  const ifThens = rest as BreakpointCondition<TValue>[];
  return elementSize(element).pipe(mapBreakpoints(...ifThens));
}
