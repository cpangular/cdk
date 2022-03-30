import { Observable } from 'rxjs';

export type IResolvable<T> = T | Observable<T>;
