import { IResolvable } from '@cpangular/cdk/value-resolver';
import { MenuMode } from '../components/layout/MenuMode';
import { ScrollBehavior } from '../components/layout/ScrollBehavior';

export interface IMenuConfiguration {
  mode: IResolvable<MenuMode>;
  scrollBehavior?: IResolvable<ScrollBehavior>;
}

const baseMenuConfiguration: IMenuConfiguration = {
  mode: MenuMode.underHeaderInlineToggle,
  scrollBehavior: ScrollBehavior.FIXED,
};

export const defaultMenuStartConfiguration: IMenuConfiguration = {
  ...baseMenuConfiguration,
  mode: MenuMode.viewportOverToggle,
};

export const defaultMenuEndConfiguration: IMenuConfiguration = {
  ...baseMenuConfiguration,
};
