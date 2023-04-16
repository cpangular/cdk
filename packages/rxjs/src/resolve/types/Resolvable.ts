import { Observable } from 'rxjs';

/**
 * A type that can be resolved to a value.
 */
export type Resolvable<T> = T | Observable<T> | Promise<T>;
