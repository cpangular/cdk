
import { IfCondition } from "../../conditions";
import { Size } from "../../size";


/**
 * A {@link BreakpointCondition} is an {@link IfCondition} that uses a {@link Size} as the condition.
 * @template TValue The type of the value to return.
 * @example
 * import { Size, BreakpointCondition } from '@cpangular/rxjs';
 *
 * const condition: BreakpointCondition<string> = {
 *  check: (size: Size) => size.width > 100,
 *  then: (size: Size) => 'Hello World'
 * };
 *
 */
export type BPCondition = IfCondition<Size>;
