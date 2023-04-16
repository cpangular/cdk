import { Observable } from 'rxjs';

/**
 * A rxjs operator that transforms an observable of type T into a value of observable R.
 * @template T The value to transform.
 * @template R The result of the transform.
 * @param { Observable<T> } source - The source observable.
 * @returns An observable that emits the result of the transform.
 *
 */
export type TransformOperation<T, R> = (source: Observable<T>) => Observable<R>;
