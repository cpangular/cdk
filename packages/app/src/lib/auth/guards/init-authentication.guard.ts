import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { InitializeAuthentication } from '../state/authentication.actions';

@Injectable({
  providedIn: 'root',
})
export class InitAuthenticationGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch(new InitializeAuthentication()).pipe(map((v) => true));
  }
}
