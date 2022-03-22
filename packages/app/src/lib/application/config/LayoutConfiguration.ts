import { IResolvable } from "@cpangular/cdk/value-resolver";
import { ScrollBehavior } from "../components/layout/ScrollBehavior";

export interface ILayoutConfiguration {
  footerScrollBehavior?: IResolvable<ScrollBehavior>;
  menuEndScrollBehavior?: IResolvable<ScrollBehavior>;
  menuStartScrollBehavior?: IResolvable<ScrollBehavior>;
  rightToLeft?: IResolvable<boolean>;
}
