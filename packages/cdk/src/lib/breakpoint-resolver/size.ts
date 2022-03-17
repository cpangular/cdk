import { IfThen } from "@cpangular/cdk/value-resolver";
import { combineLatest, map, of, switchMap } from "rxjs";
import { BreakpointResolverModule } from "./breakpoint-resolver.module";
import { BreakpointCondition } from "./BreakpointCondition";
import { Breakpoints } from "./Breakpoints";
import { getMediaQueryFromBreakpointCondition } from "./getMediaQueryFromBreakpointCondition";

export function size<T>(cond: BreakpointCondition, thenValue: T): IfThen<T> {
  const conditions = (Array.isArray(cond) ? cond : [cond]).map(
    (c) => getMediaQueryFromBreakpointCondition(c)
  );

  const condition = BreakpointResolverModule.breakpointObserver$.pipe(
    switchMap((bpo) => combineLatest([of(bpo), bpo.observe(conditions)])),
    map(([bpo, state]) => {
      if (state.matches) {
        const fails = conditions.filter((c) => !bpo.isMatched(c));
        return !fails.length;
      }
      return false;
    })
  );

  return {
    condition,
    thenValue,
  };
}
