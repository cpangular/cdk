import { BreakpointAliases } from "./BreakpointAliases";
import { BreakpointValues } from "./BreakpointValues";
import { Breakpoints as MatBreakpoints } from "@angular/cdk/layout";

export function getMediaQueryFromBreakpointCondition(
  condition: string
): string {
  condition = BreakpointAliases[condition] ?? condition;
  if (BreakpointValues[condition as keyof BreakpointValues]) {
    return BreakpointValues[condition as keyof BreakpointValues];
  }
  if (MatBreakpoints[condition as keyof typeof MatBreakpoints]) {
    return MatBreakpoints[condition as keyof typeof MatBreakpoints];
  }
  return condition;
}
