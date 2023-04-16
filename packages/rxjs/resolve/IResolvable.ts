import { Observable } from "rxjs";

/**
 * A type that can be resolved to a value.
 */
export type IResolvable<T> = T | Observable<T> | Promise<T>;
