import { Breakpoints as MatBreakpoints } from "@angular/cdk/layout";
import { BPCondition } from "./BPCondition";
import { BreakpointValueResolver } from "./BreakpointValueResolver";
import { IBreakpointValueResolver } from "./IBreakpointValueResolver";

export function match<T>(
  condition: BPCondition,
  thenValue: T
): IBreakpointValueResolver<T> {
  MatBreakpoints.Handset;
  return BreakpointValueResolver.match(condition, thenValue);
}
