import { Observable, from, isObservable, of } from 'rxjs';
import { IResolvable } from './IResolvable';

function isPromise(v: any): v is Promise<any> {
  return v && typeof v.then === 'function';
}

/**
 * Converts a value to an observable.
 * @param { IResolvable<T> } value The value to convert.
 * @returns { Observable<T> } An observable that emits the value.
 * @example
 * import { toObservable } from '@cpangular/rxjs/resolve';
 *
 * toObservable(1).subscribe((value) => {
 *  console.log(value);
 * });
 *
 */
export function toObservable<T>(value: IResolvable<T>): Observable<T> {
  return isObservable(value) ? value : isPromise(value) ? from(value) : of(value);
}
