import { Inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import produce, { Draft } from "immer";
import { Observable, of, shareReplay, Subject, switchMap, tap } from "rxjs";
import { IUser } from "../models/IUser";
import { AuthenticationService } from "../service/authentication.service";
import { IAuthenticationService } from "../service/IAuthenticationService";
import {
  Authenticate,
  InitializeAuthentication,
  Logout,
  SetUser,
} from "./authentication.actions";

export enum AuthenticationStatus {
  NONE,
  INITIALIZING,
  INITIALIZED,
  AUTHENTICATING,
  AUTHENTICATED,
  ERROR,
}

export interface AuthenticationStateModel {
  status: AuthenticationStatus;
  user: IUser | null;
}

@State<AuthenticationStateModel>({
  name: "authenticationState",
  defaults: {
    status: AuthenticationStatus.NONE,
    user: null,
  },
})
@Injectable()
export class AuthenticationState implements NgxsOnInit {
  private _init$?: Observable<IUser | null>;
  @Selector()
  public static user(state: AuthenticationStateModel) {
    return state.user;
  }

  @Selector()
  public static status(state: AuthenticationStateModel) {
    return state.status;
  }

  @Selector()
  public static isAuthenticated(state: AuthenticationStateModel) {
    return !!state.user;
  }

  public constructor(
    @Inject(AuthenticationService)
    private readonly service: IAuthenticationService
  ) {}

  public ngxsOnInit(ctx: StateContext<AuthenticationStateModel>) {
    this.service.currentUser$.subscribe((user) => {
      console.log("user -> ", user);
      ctx.dispatch(new SetUser(user));
      /*ctx.setState(
        produce((draft: Draft<AuthenticationStateModel>) => {
          draft.user = user;
          draft.status = AuthenticationStatus.AUTHENTICATED;
        })*/
      //  );
    });
    // ctx.dispatch(new InitializeAuthentication());
  }

  private setStatus(
    ctx: StateContext<AuthenticationStateModel>,
    status: AuthenticationStatus
  ) {
    ctx.setState(
      produce((draft: Draft<AuthenticationStateModel>) => {
        draft.status = status;
      })
    );
  }

  @Action(InitializeAuthentication)
  public initializeAuthentication(ctx: StateContext<AuthenticationStateModel>) {
    if (!this._init$) {
      this.setStatus(ctx, AuthenticationStatus.INITIALIZING);
      const sub = new Subject<null | IUser>();
      this._init$ = sub.pipe(shareReplay(1));
      this.service.loadCurrentUser().subscribe({
        next: (user) => {
          ctx.setState(
            produce((draft: Draft<AuthenticationStateModel>) => {
              draft.user = user ?? null;
              draft.status = user
                ? AuthenticationStatus.AUTHENTICATED
                : AuthenticationStatus.INITIALIZED;
            })
          );
          sub.next(user);
          sub.complete();
        },
        error: (error) => {
          ctx.setState(
            produce((draft: Draft<AuthenticationStateModel>) => {
              draft.user = null;
              draft.status = AuthenticationStatus.ERROR;
            })
          );
          sub.next(null);
          sub.complete();
        },
      });
    }
    return this._init$;
  }

  @Action(SetUser, { cancelUncompleted: true })
  private setUser(
    ctx: StateContext<AuthenticationStateModel>,
    { user }: SetUser
  ) {
    ctx.setState(
      produce((draft: Draft<AuthenticationStateModel>) => {
        draft.user = user ?? null;
        draft.status = user
          ? AuthenticationStatus.AUTHENTICATED
          : AuthenticationStatus.INITIALIZED;
      })
    );
  }

  @Action(Authenticate, { cancelUncompleted: true })
  public authenticate(ctx: StateContext<AuthenticationStateModel>) {
    const state = ctx.getState();
    if (state.user) {
      return of(state.user);
    }
    return this.initializeAuthentication(ctx).pipe(
      switchMap((u) => {
        if (u) {
          this.setStatus(ctx, AuthenticationStatus.AUTHENTICATED);
          return of(u);
        }
        this.setStatus(ctx, AuthenticationStatus.AUTHENTICATING);
        return this.service.authenticate();
      }),
      tap({
        next: (user) => {
          ctx.setState(
            produce((draft: Draft<AuthenticationStateModel>) => {
              draft.user = user;
              draft.status = AuthenticationStatus.AUTHENTICATED;
            })
          );
        },
        error: (error) => {
          ctx.setState(
            produce((draft: Draft<AuthenticationStateModel>) => {
              draft.user = null;
              draft.status = AuthenticationStatus.ERROR;
            })
          );
        },
      })
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthenticationStateModel>) {
    return this.service.logout();
  }
}
