import { OpenIdConfiguration } from 'angular-auth-oidc-client';
import { LoginMethod } from './LoginMethod';

export interface Configuration extends OpenIdConfiguration {
  loginMethod?: LoginMethod;
}
