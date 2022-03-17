import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable, of } from "rxjs";
import { IUser } from "../models/IUser";
import { IAuthenticationService } from "./IAuthenticationService";

@Injectable({
  providedIn: "root",
})
export class FakeAuthenticationService implements IAuthenticationService {
  private __user: IUser = {
    id: "fakeUser1234",
    username: "fake@user.com",
    displayName: "Fake User",
    data: {
      id: "fakeUser1234",
      username: "fake@user.com",
      displayName: "Fake User",
    },
  };

  private _user: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  public get currentUser$(): Observable<IUser | null> {
    return this._user;
  }

  public authenticate(): Observable<IUser> {
    this._user.next({ ...this.__user });
    return (this._user as Observable<IUser>).pipe(delay(1));
  }
  public logout(): Observable<void> {
    this._user.next(null);
    return of().pipe(delay(1));
  }
  public loadCurrentUser(): Observable<IUser | null> {
    return this._user.pipe(delay(1));
  }
}
