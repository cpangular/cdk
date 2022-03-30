import { InjectionToken } from '@angular/core';
import { IHeaderConfiguration } from './HeaderConfiguration';
import { ILayoutConfiguration } from './LayoutConfiguration';
import { IMenuConfiguration } from './MenuConfiguration';

export interface IApplicationConfiguration {
  layout: ILayoutConfiguration;
  header: IHeaderConfiguration;
  menuStart: IMenuConfiguration;
  menuEnd: IMenuConfiguration;
}

export const ApplicationConfiguration: InjectionToken<IApplicationConfiguration> = new InjectionToken<IApplicationConfiguration>(
  'Application Layout Configuration',
  {
    providedIn: 'root',
    factory: () => ({} as IApplicationConfiguration),
  }
);
