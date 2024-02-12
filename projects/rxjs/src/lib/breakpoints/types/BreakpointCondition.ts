import { IfThenCondition } from '../../conditions';
import { Size } from '../../size';

/**
 * A {@link BreakpointCondition} is an {@link IfThenCondition} that uses a {@link Size} as the condition.
 * @template TValue The type of the value to return.
 * @example
 * const condition: BreakpointCondition<string> = {
 *   check: (size: Size) => size.width > 100,
 *   then: (size: Size) => 'Hello World'
 * };
 */

export type BreakpointCondition<TValue = unknown> = IfThenCondition<TValue, Size>;
