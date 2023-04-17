import { BreakpointRange } from "./BreakpointRange";

/**
 * {@link BreakpointRanges} is a map of {@link BreakpointRange} values.  The key is the name of the breakpoint.
 * @example
 * const breakpoints: BreakpointRanges = {
 *   xs: {
 *     min: 0,
 *     max: 600
 *   },
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
 *    min: 1920
 *  }
 * };
 *
 */

export type BreakpointRanges = {
  [key: string]: BreakpointRange;
};
