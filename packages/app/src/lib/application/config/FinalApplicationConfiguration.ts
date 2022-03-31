import { inject, InjectionToken } from '@angular/core';
import { merge } from 'lodash';
import { ApplicationConfiguration, IApplicationConfiguration } from './ApplicationConfiguration';
import { defaultApplicationConfiguration } from './defaultApplicationConfiguration';

export const FinalApplicationConfiguration: InjectionToken<IApplicationConfiguration> = new InjectionToken<IApplicationConfiguration>(
  'Application Layout Configuration',
  {
    providedIn: 'root',
    factory: () => {
      const uConfig = inject(ApplicationConfiguration) as IApplicationConfiguration;
      const config = merge(defaultApplicationConfiguration, uConfig);
      return config;
    },
  }
);
