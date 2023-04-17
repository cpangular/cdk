

/**
 * A {@link BreakpointRange} is a numeric range that defines a breakpoint.  The min is inclusive and the max is exclusive.
 * If the min is not defined, it is considered to be 0.  If the max is not defined, it is considered to be infinity.
 *
 * @example
 * const breakpoint: BreakpointValue = {
 *   min: 100,
 *   max: 200
 * };
 *
 */
export type BreakpointRange = {
  min?: number;
  max?: number;
};
