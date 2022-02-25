import { BPCondition } from "./BPCondition";
import { IValueResolver } from "./IValueResolver";

export interface IBreakpointValueResolver<T> extends IValueResolver<T> {
  match( condition: BPCondition, thenValue: T): IBreakpointValueResolver<T>;
  default(defaultValue: T | undefined): IBreakpointValueResolver<T>;
}


