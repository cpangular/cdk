import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import produce, { Draft } from 'immer';
import { first, Observable, of, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { InitAuthenticationGuard } from '../guards/init-authentication.guard';
import { IUser } from '../models/IUser';
import { AuthenticationService } from '../service/authentication.service';
import { IAuthenticationService } from '../service/IAuthenticationService';
import { Authenticate, InitializeAuthentication, Logout, SetUser } from './authentication.actions';

export enum AuthenticationStatus {
  NONE,
  INITIALIZING,
  AUTHENTICATING,
  LOGGING_OUT,
  INITIALIZED,
  AUTHENTICATED,
  ERROR,
}

export interface AuthenticationStateModel {
  status: AuthenticationStatus;
  user: IUser | null;
}

@State<AuthenticationStateModel>({
  name: 'authenticationState',
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
    private readonly service: IAuthenticationService,
    private readonly router: Router,
    private readonly injector: Injector,
    @Optional()
    @Inject(APP_BASE_HREF)
    private readonly baseRef: string | null
  ) {
    router.config.forEach((c) => {
      if (!Array.isArray(c.canActivate)) {
        c.canActivate = [InitAuthenticationGuard];
      } else {
        c.canActivate = [InitAuthenticationGuard, ...c.canActivate.filter((g) => g !== InitAuthenticationGuard)];
      }
    });
  }

  public ngxsOnInit(ctx: StateContext<AuthenticationStateModel>) {
    //this.__init$.subscribe();
    setTimeout(() => {
      this.service.loadCurrentUser().pipe(first(), shareReplay(1)).subscribe();
    });

    this.service.currentUser$.subscribe((user) => {
      const status = ctx.getState().status;
      if (status >= AuthenticationStatus.INITIALIZED) {
        ctx.dispatch(new SetUser(user));
      }
    });
  }

  private setStatus(ctx: StateContext<AuthenticationStateModel>, status: AuthenticationStatus) {
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
          ctx.setState({
            user,
            status: user ? AuthenticationStatus.AUTHENTICATED : AuthenticationStatus.INITIALIZED,
          });

          sub.next(user);
          sub.complete();
        },
        error: (error) => {
          ctx.setState({
            user: null,
            status: AuthenticationStatus.ERROR,
          });
          sub.next(null);
          sub.complete();
        },
      });
    }
    return this._init$;
  }

  @Action(SetUser, { cancelUncompleted: true })
  private setUser(ctx: StateContext<AuthenticationStateModel>, { user }: SetUser) {
    ctx.setState(
      produce((draft: Draft<AuthenticationStateModel>) => {
        draft.user = user ?? null;
        draft.status = user ? AuthenticationStatus.AUTHENTICATED : AuthenticationStatus.INITIALIZED;
      })
    );
  }

  private runGuards() {
    const base = this.baseRef ?? '/';
    const path = window.location.pathname.substring(base.length);
    return this.router.navigate(['302', ...path.split('/')], {
      preserveFragment: true,
      queryParamsHandling: 'preserve',
      replaceUrl: true,
    });
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
        error: (error) => {
          ctx.setState({
            user: null,
            status: AuthenticationStatus.ERROR,
          });
        },
      })
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthenticationStateModel>) {
    this.setStatus(ctx, AuthenticationStatus.LOGGING_OUT);
    return this.service.logout().pipe(
      tap({
        next: () => {
          ctx.setState({
            user: null,
            status: AuthenticationStatus.INITIALIZED,
          });
          this.runGuards();
        },
        error: (error) => {
          ctx.setState({
            user: null,
            status: AuthenticationStatus.ERROR,
          });
          this.runGuards();
        },
      })
    );
  }
}
