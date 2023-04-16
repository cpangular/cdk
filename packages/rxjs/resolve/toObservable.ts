import { Observable, from, isObservable, of } from 'rxjs';
import { IResolvable } from './IResolvable';

function isPromise(v: any): v is Promise<any> {
  return v && typeof v.then === 'function';
} 


export function toObservable<T>(v: IResolvable<T>): Observable<T> {
  return isObservable(v) ? v : (isPromise(v) ? from(v) : of(v));
}
