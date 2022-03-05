import { Observable, isObservable, of } from "rxjs";
import { IResolvable } from "./IResolvable";


export function observe<T>(v: IResolvable<T>): Observable<T> {
    return isObservable(v) ? v : of(v);
}
