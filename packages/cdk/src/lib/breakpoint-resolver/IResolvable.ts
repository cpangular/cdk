import { IValueResolver } from "./IValueResolver";

export type IResolvable<T> = T | undefined | IValueResolver<T>;
