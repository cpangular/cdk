import {
  distinctUntilChanged,
  Observable,
  shareReplay,
  Subscription,
} from "rxjs";
import { IfThenEntry } from "./IfThenEntry";
import { mapFirst } from "../operators";

export function when<TValue, TCondition>(
  ...ifThens: IfThenEntry<TValue, TCondition>[]
) {
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
