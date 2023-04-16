import { IfThenEntry } from '../conditions';
import { Size } from '../size';

/**
 * A {@link BreakpointEntry} is an {@link IfThenEntry} that uses a {@link Size} as the condition.
 * @template TValue The type of the value to return.
 * @example
 * const condition: BreakpointEntry<string> = {
 *   check: (size: Size) => size.width > 100,
 *   then: (size: Size) => 'Hello World'
 * };
 */

export type BreakpointEntry<TValue = unknown> = IfThenEntry<TValue, Size>;
