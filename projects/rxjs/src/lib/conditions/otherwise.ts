import { IfThenCondition } from './types/IfThenCondition';

/**
 * Creates an {@link IfThenCondition} that will always be true. This is useful for the last condition in a chain of conditions.
 * @param value The value function to return.
 * @returns An {@link IfThenCondition}.
 * @example
 * const condition = otherwise('Hello World');
 */
export const otherwise = <T>(value: T): IfThenCondition<T> => ({
  check: () => true,
  then: () => value,
});
