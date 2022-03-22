import { IResolvable } from "@cpangular/cdk/value-resolver";
import { ScrollBehavior } from "../components/layout/ScrollBehavior";

export const defaultHeaderConfiguration: IHeaderConfiguration = {
  headerToolbarColor: "accent",
  preHeaderToolbarColor: "",
  postHeaderToolbarColor: "",
  actionToolbarColor: "primary",
  scrollBehavior: ScrollBehavior.FLOAT,
};

export interface IHeaderConfiguration {
  scrollBehavior?: IResolvable<ScrollBehavior>;
  headerToolbarColor: IResolvable<"primary" | "accent" | "warn" | "">;
  preHeaderToolbarColor: IResolvable<"primary" | "accent" | "warn" | "">;
  postHeaderToolbarColor: IResolvable<"primary" | "accent" | "warn" | "">;
  actionToolbarColor: IResolvable<"primary" | "accent" | "warn" | "">;
}
