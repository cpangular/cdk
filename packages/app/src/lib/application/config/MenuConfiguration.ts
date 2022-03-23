import { IResolvable } from "@cpangular/cdk/value-resolver";
import { MenuMode } from "../components/layout/MenuMode";
import { ScrollBehavior } from "../components/layout/ScrollBehavior";

export interface IMenuConfiguration {
  mode: IResolvable<MenuMode>;
  scrollBehavior?: IResolvable<ScrollBehavior>;
}

const baseMenuConfiguration: IMenuConfiguration = {
  mode: MenuMode.FIXED,
  scrollBehavior: ScrollBehavior.FIXED,
};

export const defaultMenuStartConfiguration: IMenuConfiguration = {
  ...baseMenuConfiguration,
  mode: MenuMode.OVER,
  scrollBehavior: ScrollBehavior.SCROLL,
};

export const defaultMenuEndConfiguration: IMenuConfiguration = {
  ...baseMenuConfiguration,
};
