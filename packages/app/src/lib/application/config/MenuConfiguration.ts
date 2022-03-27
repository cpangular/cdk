import { IResolvable } from "@cpangular/cdk/value-resolver";
import { MenuMode } from "../components/layout/MenuMode";
import { ScrollBehavior } from "../components/layout/ScrollBehavior";
import {NestedTreeControl} from '@angular/cdk/tree';

export interface IMenuConfiguration {
  mode: IResolvable<MenuMode>;
  scrollBehavior?: IResolvable<ScrollBehavior>;
}

const baseMenuConfiguration: IMenuConfiguration = {
  mode: MenuMode.scrollToggle,
  scrollBehavior: ScrollBehavior.FIXED,
};

export const defaultMenuStartConfiguration: IMenuConfiguration = {
  ...baseMenuConfiguration,
};

export const defaultMenuEndConfiguration: IMenuConfiguration = {
  ...baseMenuConfiguration,
};

