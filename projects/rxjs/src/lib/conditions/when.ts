import { distinctUntilChanged, Observable, shareReplay, switchMap } from 'rxjs';

import { mapFirst } from '../operators';
import { toObservable } from '../resolve';
import { IfThenCondition } from './types/IfThenCondition';

/**
 * Rxjs operator that emits the first value that matches the condition. If no condition matches, it emits undefined.
 * @template TValue The type of the value to return.
 * @template TCondition The type of the condition data to check
 * @param {IfThenCondition<TValue, TCondition>[]} ifThens - The conditions to check.
 * @returns An observable that emits the result of the first transform that returns a value function.
 *
 */

export function when<TValue, TCondition>(...ifThens: IfThenCondition<TValue, TCondition>[]) {
  const ifThenConditions = ifThens.map((ifThen) => (condition: TCondition) => {
    if (ifThen.check(condition)) {
      return ifThen.then;
    }
    return undefined;
  });
  return (source: Observable<TCondition>) => {
    return source.pipe(
      mapFirst(ifThenConditions, undefined as TValue),
      switchMap((value) => toObservable(value)),
      distinctUntilChanged(),
      shareReplay(1)
    );
  };
}
