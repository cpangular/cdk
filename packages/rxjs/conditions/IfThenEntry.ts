export type IfCheck<TCondition = unknown> = (condition: TCondition) => boolean;
export type IfThen<TValue, TCondition = unknown> = (condition: TCondition) => TValue;

/**
 * An entry of  a condition to check and a value function to call if the check passes.
 * @template TValue The type of the value to return if the condition is true.
 * @template TCondition The type of the condition data to check
 * @example
 * const condition: IfThenEntry<string, number> = {
 *   check: (data: number) => data > 1,
 *   then: (data: number) => 'Hello World'
 * };
 *
 */
export interface IfThenEntry<TValue, TCondition = unknown> {
  /**
   * The condition to check.
   * @example
   * const condition: IfThenEntry<string, number> = {
   *  check: (data: number) => data > 1,
   * then: (data: number) => 'Hello World'
   * };
   *
   */
  check: IfCheck<TCondition>;
  /**
   * The function to call if the condition is true.
   * @example
   * const condition: IfThenEntry<string, number> = {
   * check: (data: number) => data > 1,
   * then: (data: number) => 'Hello World'
   * };
   *
   */
  then: IfThen<TValue, TCondition>;
}
