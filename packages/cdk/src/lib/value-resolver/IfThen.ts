import { Observable } from "rxjs";

export interface IfThen<T> {
  condition: Observable<boolean>;
  thenValue: T;
}
