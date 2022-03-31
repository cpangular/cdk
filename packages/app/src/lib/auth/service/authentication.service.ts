import { InjectionToken } from '@angular/core';
import { FakeAuthenticationService } from './FakeAuthenticationService';
import { IAuthenticationService } from './IAuthenticationService';

export const AuthenticationService: InjectionToken<IAuthenticationService> = new InjectionToken<IAuthenticationService>('', {
  providedIn: 'root',
  factory: () => {
    return new FakeAuthenticationService();
  },
});
