import { IfCondition } from './IfCondition';
import { IfThen } from './IfThen';

/**
 * A condition to check and a function to call if the condition is true.
 * @template TValue The type of the value to return if the condition is true.
 * @template TCondition The type of the condition data to check
 *
 * @example
 * const condition: IfThenCondition<string, number> = {
 *   check: (data: number) => data > 1,
 *   then: (data: number) => 'Hello World'
 * };
 *
 */
export interface IfThenCondition<TValue, TCondition = unknown> {
  /**
   * The condition to check.
   * @template TCondition The type of the condition data to check
   * @param data The data to check
   * @returns True if the condition is true.
   */
  check: IfCondition<TCondition>;
  /**
   * The function to call if the condition is true.
   * @template TValue The type of the value to return if the condition is true.
   * @template TCondition The type of the condition data to check
   * @param data The data to check
   * @returns {Resolvable<TValue>} The Resolvable<TValue> value if the condition is true.
   */
  then: IfThen<TValue, TCondition>;
}
