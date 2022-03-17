import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthenticationState } from "../state/authentication.state";
import { Store } from "@ngxs/store";
import { map, Observable } from "rxjs";
import { InitializeAuthentication } from "../state/authentication.actions";

@Injectable({
  providedIn: "root",
})
export class InitAuthenticationGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store
      .dispatch(new InitializeAuthentication())
      .pipe(map((v) => {
        console.log('-----', v, this.store.selectSnapshot(AuthenticationState));
        return true;
      }));
  }
}
