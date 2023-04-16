import { IfThenEntry } from './IfThenEntry';

/**
 * Creates an {@link IfThenEntry} that will always be true. This is useful for the last condition in a chain of conditions.
 * @param value The value function to return.
 * @returns An {@link IfThenEntry}.
 * @example
 * const condition = otherwise('Hello World');
 */
export const otherwise = <T>(value: T): IfThenEntry<T> => ({
  check: () => true,
  then: () => value,
});
