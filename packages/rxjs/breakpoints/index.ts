import { mapFirst } from '@cpangular/rxjs';
import { Observable, distinctUntilChanged, shareReplay } from 'rxjs';
import { IfThenEntry } from '../conditions';
import { Size } from '../size';

export type BreakpointEntry<TValue = unknown> = IfThenEntry<TValue, Size>;
export type BreakpointOperator<TValue = unknown> = (source: Observable<Size>) => Observable<TValue | undefined>;

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
