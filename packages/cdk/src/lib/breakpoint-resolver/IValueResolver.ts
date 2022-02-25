import { isObservable, Observable } from "rxjs";

export interface IValueResolver<T> {
  readonly valueChange: Observable<T | undefined>;
}

export function isValueResolver(value: any): value is IValueResolver<any> {
  if (
    typeof value === 'object' &&
    isObservable(value.valueChange)
  ) {
    return true;
  }
  return false;
}
