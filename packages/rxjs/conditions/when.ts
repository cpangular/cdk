import { distinctUntilChanged, Observable, shareReplay } from 'rxjs';
import { mapFirst } from '../operators';
import { IfThenEntry } from './IfThenEntry';

/**
 * RxJs operator that takes a list of IfThenEntry and returns an observable that emits the first value that matches the condition.
 * @param ifThens The list of {@link IfThenEntry}'s to check.
 * @returns An observable that emits the first value that matches the condition.
 *
 */

export function when<TValue, TCondition>(...ifThens: IfThenEntry<TValue, TCondition>[]) {
  const mapped = mapFirst<TCondition, TValue>(
    ifThens.map((ifThen) => (condition: TCondition) => {
      if (ifThen.check(condition)) {
        return ifThen.then;
      }
      return undefined;
    }),
    undefined as TValue
  );
  return (source: Observable<TCondition>) => {
    return mapped(source).pipe(distinctUntilChanged(), shareReplay(1));
  };
}
