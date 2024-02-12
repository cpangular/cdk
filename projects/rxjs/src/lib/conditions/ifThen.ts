import { Resolvable } from '../resolve';
import { IfCondition } from './types/IfCondition';
import { IfThen } from './types/IfThen';
import { IfThenCondition } from './types/IfThenCondition';

/**
 * Creates an {@link IfThenCondition}.
 * @param check The condition to check.
 * @param valueFn The function to call to if the condition is true.
 * @returns An {@link IfThenCondition}.
 * @example
 * const condition = ifThen(
 * () => Math.random() > 0.5,
 * () => 'Hello World'
 * );
 *
 */
export function ifThen<TValue, TCondition>(
  check: IfCondition<TCondition>,
  valueFn: (condition: TCondition) => Resolvable<TValue>,
): IfThenCondition<TValue, TCondition>;

/**
 * Creates an {@link IfThenCondition}.
 * @param check The condition to check.
 * @param value The value to return if the condition is true.
 * @returns An {@link IfThenCondition}.
 * @example
 * const condition = ifThen(
 *  () => Math.random() > 0.5,
 * 'Hello World'
 * );
 *
 */

export function ifThen<TValue, TCondition>(
  check: IfCondition<TCondition>,
  value: Resolvable<TValue>,
): IfThenCondition<TValue, TCondition>;

export function ifThen<TValue, TCondition>(
  check: IfCondition<TCondition>,
  value: Resolvable<TValue> | IfThen<TValue, TCondition>,
): IfThenCondition<TValue, TCondition> {
  return {
    check,
    then:
      typeof value === 'function'
        ? (value as IfThen<TValue, TCondition>)
        : () => value,
  };
}
