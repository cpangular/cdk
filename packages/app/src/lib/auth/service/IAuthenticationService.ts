import { Observable } from "rxjs";
import { IUser } from "../models/IUser";


export interface IAuthenticationService {
    readonly currentUser$:Observable<IUser | null>;
    loadCurrentUser(): Observable<IUser | null>;
    authenticate(): Observable<IUser>;
    logout(): Observable<void>;
}
