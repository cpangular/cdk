import { APP_BASE_HREF } from "@angular/common";
import { Inject, Injectable, NgZone, Optional } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  Router
} from "@angular/router";
import { IAuthenticationService, IUser } from "@cpangular/app/auth";
import { OidcSecurityService } from "angular-auth-oidc-client";
import {
  distinctUntilChanged,
  filter,
  first,
  fromEvent,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap
} from "rxjs";
import { AuthIFrameComponent } from "./auth-iframe/auth-iframe.component";
import { Configuration } from "./config/Configuration";
import { LoginMethod } from "./config/LoginMethod";
import {isEqual} from 'lodash'
@Injectable()
export class OIDCAuthenticationService implements IAuthenticationService {
  constructor(
    private readonly oidcSecurityService: OidcSecurityService,
    private readonly dialogService: MatDialog,
    private readonly zone: NgZone,
    private readonly router: Router,
    @Optional() @Inject(APP_BASE_HREF) private readonly baseRef: string
  ) {
    /*this.router.events.pipe(
      filter(
        (e) =>
          e instanceof NavigationStart ||
          e instanceof ActivationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
      ),
      map((e) => {
        switch (true) {
          case e instanceof NavigationStart:
            return [];
          case e instanceof ActivationStart:
            return [];
        }
      })
    );*/
  }

  public readonly currentUser$ = this.oidcSecurityService.userData$.pipe(
    map((u) => {
      if (!u.userData) {
        return null;
      }
      const data: { [key: string]: any[] } = {};
      for (const key in u.userData) {
        if (Object.prototype.hasOwnProperty.call(u.userData, key)) {
          const value = u.userData[key] as any | any[];
          data[key] = Array.isArray(value) ? value : [value];
        }
      }
      return {
        id: u.userData.sub,
        username: u.userData.preferred_username,
        displayName:
          u.userData.display_name ??
          `${u.userData.given_name} ${u.userData.family_name}`.trim(),
        data,
      } as IUser;
    }),
    distinctUntilChanged(isEqual),
    shareReplay(1)
  );

  loadCurrentUser(): Observable<IUser | null> {
    return this.oidcSecurityService
      .checkAuthIncludingServer()
      .pipe(switchMap((_) => this.currentUser$));
  }

  authenticate(): Observable<IUser> {
    const config = this.oidcSecurityService.getConfiguration() as Configuration;
    switch (config.loginMethod) {
      case LoginMethod.INLINE:
        return this.authenticateInline();
    }

    return of({} as IUser);
  }

  private authenticateInline(): Observable<IUser> {
    var authUser: Subject<IUser> = new Subject();
    let dRef: MatDialogRef<any> | undefined;

    this.waitForRenew().subscribe((s) => {
      this.currentUser$
        .pipe(
          filter((u) => u !== null),
          first()
        )
        .subscribe((u) => {
          authUser.next(u!);
          authUser.complete();
          dRef?.close();
        });
    });

    this.oidcSecurityService.authorize(undefined, {
      customParams: {
        originUrl: this.originUrl,
      },
      urlHandler: (url: string) => {
        this.zone.run(() => {
          dRef = this.dialogService.open(AuthIFrameComponent, {
            minWidth: "100%",
            maxWidth: "100%",
            width: "100%",
            minHeight: "100%",
            maxHeight: "100%",
            height: "100%",
            data: {
              url,
            },
          });
        });
      },
    });
    return authUser.asObservable();
  }

  private get originUrl(): string {
    let baseRef = `${window.location.protocol}//${window.location.host}`;
    baseRef += this.baseRef ? `/${this.baseRef}` : "";
    return `${baseRef}/${
      this.router.getCurrentNavigation()?.finalUrl?.toString() ?? ""
    }`;
  }

  logout(): Observable<void> {
    return this.oidcSecurityService.checkAuthIncludingServer().pipe(
      switchMap((user) => {
        if (!user?.isAuthenticated) {
          return of();
        }
        const config =
          this.oidcSecurityService.getConfiguration() as Configuration;
        switch (config.loginMethod) {
          case LoginMethod.INLINE:
            return this.logoutInline();
        }
        return of();
      })
    );
    /* return this.loadCurrentUser().pipe(
      switchMap((user) => {
        if (!user) {
          return of();
        }
        const config =
          this.oidcSecurityService.getConfiguration() as Configuration;
        switch (config.loginMethod) {
          case LoginMethod.INLINE:
            return this.logoutInline();
        }
        return of();
      })
    );*/
  }

  private logoutInline(): Observable<void> {
    var logout: Subject<void> = new Subject();
    let dRef: MatDialogRef<any> | undefined;

    this.waitForLogout().subscribe((s) => {
      console.log("waitForLogout", s);
      this.oidcSecurityService.logoffLocal();
      logout.next();
      logout.complete();
      dRef?.close();
    });

    dRef = this.dialogService.open(AuthIFrameComponent, {
      minWidth: "100%",
      maxWidth: "100%",
      width: "100%",
      minHeight: "100%",
      maxHeight: "100%",
      height: "100%",
      data: {
        url: this.oidcSecurityService.getEndSessionUrl(),
      },
    });

    return logout.asObservable();
  }

  private waitForRenew() {
    return fromEvent(window, "oidc-silent-renew-message").pipe(first());
  }
  private waitForLogout() {
    return fromEvent(window, "oidc-logout-message").pipe(first());
  }
}
