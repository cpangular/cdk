import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Authenticate } from "../state/authentication.actions";
import { Store } from "@ngxs/store";
import { map, Observable } from "rxjs";
import { AuthenticationState, AuthenticationStateModel } from "../state/authentication.state";

@Injectable({
  providedIn: "root",
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.dispatch(new Authenticate()).pipe(
      map(() => {
        const user =
          !!this.store.selectSnapshot<AuthenticationStateModel>(
            AuthenticationState
          ).user;
        return user;
      })
    );
  }
}
