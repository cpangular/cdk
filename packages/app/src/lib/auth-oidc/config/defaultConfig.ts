import { Configuration } from './Configuration';
import { LoginMethod } from './LoginMethod';

export const DefaultConfig: Configuration = {
  loginMethod: LoginMethod.INLINE,
  silentRenew: true,
  silentRenewUrl: 'https://localhost:4200/oidc-renew.html',
  postLogoutRedirectUri: 'https://localhost:4200/oidc-login.html',
};
