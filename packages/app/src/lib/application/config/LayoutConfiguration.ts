import { IResolvable } from "@cpangular/cdk/value-resolver";
import { ScrollBehavior } from "../components/layout/ScrollBehavior";

export type ConstrainedApplicationAlignment =
  | "left"
  | "center"
  | "right"
  | "start"
  | "end";
export interface ILayoutConfiguration {
  rightToLeft?: IResolvable<boolean>;
  constrainApplication?: IResolvable<string>;
  constrainedApplicationAlign?: IResolvable<ConstrainedApplicationAlignment>;
}
