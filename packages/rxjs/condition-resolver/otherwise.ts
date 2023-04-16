import { IfThenEntry } from './IfThenEntry';

export const otherwise = <T>(value: T): IfThenEntry<T> => ({
  check: () => true,
  then: () => value
});
