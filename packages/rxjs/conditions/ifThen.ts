import { IfCheck, IfThen, IfThenEntry } from './IfThenEntry';

/**
 * Creates an {@link IfThenEntry}.
 * @param check The condition to check.
 * @param value The value to return if the condition is true.
 * @returns An {@link IfThenEntry}.
 * @example
 * const condition = ifThen(
 *  () => Math.random() > 0.5,
 * 'Hello World'
 * );
 *
 */

export function ifThen<TValue, TCondition>(check: IfCheck<TCondition>, value: TValue): IfThenEntry<TValue, TCondition>;
/**
 * Creates an {@link IfThenEntry}.
 * @param check The condition to check.
 * @param valueFn The function to call to if the condition is true.
 * @returns An {@link IfThenEntry}.
 * @example
 * const condition = ifThen(
 * () => Math.random() > 0.5,
 * () => 'Hello World'
 * );
 *
 */
export function ifThen<TValue, TCondition>(
  check: IfCheck<TCondition>,
  valueFn: (condition: TCondition) => TValue
): IfThenEntry<TValue, TCondition>;
export function ifThen<TValue, TCondition>(
  check: IfCheck<TCondition>,
  value: TValue | IfThen<TValue, TCondition>
): IfThenEntry<TValue, TCondition> {
  return {
    check,
    then: typeof value === 'function' ? (value as IfThen<TValue, TCondition>) : () => value,
  };
}
