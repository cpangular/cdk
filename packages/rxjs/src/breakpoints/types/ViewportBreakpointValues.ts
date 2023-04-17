import { BreakpointRange } from './BreakpointRange';
import { BreakpointRanges } from './BreakpointValues';

/**
 * {@link ViewportBreakpointValues} is a map of {@link BreakpointRange} values.
 * The key is the name of the breakpoint.
 * The min is inclusive and the max is exclusive.
 * @example
 *
 * const breakpoints: ViewportBreakpointValues = {
 *  xs: {
 *    min: 0,
 *    max: 600
 *  },
 *  sm: {
 *    min: 600,
 *    max: 960
 *  },
 *  md: {
 *    min: 960,
 *    max: 1280
 *  },
 *  lg: {
 *    min: 1280,
 *    max: 1920
 *  },
 *  xl: {
 *    min: 1920,
 *    max: 2560
 *  },
 *  xxl: {
 *    min: 2560
 *  }
 * };
 *
 */
export interface ViewportBreakpointValues extends BreakpointRanges {
  xs: BreakpointRange;
  sm: BreakpointRange;
  md: BreakpointRange;
  lg: BreakpointRange;
  xl: BreakpointRange;
  xxl: BreakpointRange;
}
