import { Size } from "@cpangular/rxjs";
import { BPCondition } from "./types/BPCondition";
import { ViewportBreakpointValues } from "./types/ViewportBreakpointValues";

/**
 * A set of {@link BPCondition}'s that can be used to check the size of the viewport.
 * The breakpoints are: xs, sm, md, lg, xl, xxl.
 * The min is inclusive and the max is exclusive.
 *
 * @example
 * import { ViewportBreakpoints } from '@cpangular/rxjs';
 *
 * const size = { width: 1920, height: 1080 };
 *
 * const breakpoints = new ViewportBreakpoints();
 *
 * breakpoints.xs(size); // false
 * breakpoints.xxl(size); // true
 *
 * breakpoints.landscape(size); // true
 * breakpoints.portrait(size); // false
 */

export class ViewportBreakpoints {
  private _breakpointValues: ViewportBreakpointValues = {
    xs: { max: 576 },
    sm: { min: 576, max: 768 },
    md: { min: 768, max: 992 },
    lg: { min: 992, max: 1200 },
    xl: { min: 1200, max: 1400 },
    xxl: { min: 1400 },
  }

  constructor(breakpoints?: ViewportBreakpointValues) {
    if (breakpoints) {
      this._breakpointValues = { ...breakpoints };
    }
  }

  /**
   * Check multiple conditions using an and operator.
   * @param conditions The conditions to check.
   * @returns A {@link BPCondition} that returns true if all of the conditions are true.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.and(breakpoints.xs, breakpoints.xxl)(size); // false
   * breakpoints.and(breakpoints.landscape, breakpoints.xxl)(size); // true
  */
  public and(...conditions: BPCondition[]): BPCondition {
    return (size: Size) => conditions.every(condition => condition(size));
  };

  /**
   * Check multiple conditions using an or operator.
   * @param conditions The conditions to check.
   * @returns A {@link BPCondition} that returns true if any of the conditions are true.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.or(breakpoints.xs, breakpoints.sm)(size); // false
   * breakpoints.or(breakpoints.xs, breakpoints.xxl)(size); // true
   */
  public or(...conditions: BPCondition[]): BPCondition {
    return (size: Size) => conditions.some(condition => condition(size));
  };


  /**
   * The xs breakpoint is for phones in portrait mode.
   * @param size The size to check.
   * @returns True if the size is less than the max value of the xs breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.xs(size); // false
   */
  public readonly xs: BPCondition = (size: Size) => size.width < this._breakpointValues.xs.max!;
  /**
   * The sm breakpoint is for phones in landscape mode.
   * @param size The size to check.
   * @returns True if the size is greater than or equal to the min value of the sm breakpoint and less than the max value of the sm breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.sm(size); // false
   */
  public readonly sm: BPCondition = (size: Size) => size.width >= this._breakpointValues.sm.min! && size.width < this._breakpointValues.sm.max!;
  /**
   * The md breakpoint is for tablets in portrait mode.
   * @param size The size to check.
   * @returns True if the size is greater than or equal to the min value of the md breakpoint and less than the max value of the md breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.md(size); // false
   */
  public readonly md: BPCondition = (size: Size) => size.width >= this._breakpointValues.md.min! && size.width < this._breakpointValues.md.max!;
  /**
  * The lg breakpoint is for tablets in landscape mode.
  * @param size The size to check.
  * @returns True if the size is greater than or equal to the min value of the lg breakpoint and less than the max value of the lg breakpoint.
  * @example
  * const size = { width: 1920, height: 1080 };
  * const breakpoints = new ViewportBreakpoints();
  * breakpoints.lg(size); // false
  *
  */
  public readonly lg: BPCondition = (size: Size) => size.width >= this._breakpointValues.lg.min! && size.width < this._breakpointValues.lg.max!;
  /**
   * The xl breakpoint is for laptops.
   * @param size The size to check.
   * @returns True if the size is greater than or equal to the min value of the xl breakpoint and less than the max value of the xl breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.xl(size); // false
   */
  public readonly xl: BPCondition = (size: Size) => size.width >= this._breakpointValues.xl.min! && size.width < this._breakpointValues.xl.max!;
  /**
   * The xxl breakpoint is for desktops.
   * @param size The size to check.
   * @returns True if the size is greater than or equal to the min value of the xxl breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.xxl(size); // true
   */
  public readonly xxl: BPCondition = (size: Size) => size.width >= this._breakpointValues.xxl.min!;

  /**
   * The landscape breakpoint is for landscape mode.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the height.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.landscape(size); // true
   *
   */
  public readonly landscape: BPCondition = (size: Size) => size.width >= size.height;
  /**
   * The portrait breakpoint is for portrait mode.
   * @param size The size to check.
   * @returns True if the width is less than the height.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.portrait(size); // false
   */
  public readonly portrait: BPCondition = (size: Size) => size.width < size.height;

  /**
   * Larger than the xs breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the max value of the xs breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gtXs(size); // true
   */
  public readonly gtXs: BPCondition = (size: Size) => size.width >= this._breakpointValues.xs.max!;
  /**
   * Larger than the sm breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the max value of the sm breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gtSm(size); // true
   */
  public readonly gtSm: BPCondition = (size: Size) => size.width >= this._breakpointValues.sm.max!;

  /**
   *  Larger than the md breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the max value of the md breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gtMd(size); // true
   */
  public readonly gtMd: BPCondition = (size: Size) => size.width >= this._breakpointValues.md.max!;
  /**
   * Larger than the lg breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the max value of the lg breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gtLg(size); // true
   */
  public readonly gtLg: BPCondition = (size: Size) => size.width >= this._breakpointValues.lg.max!;
  /**
   * Larger than the xl breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the max value of the xl breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gtXl(size); // true
   */
  public readonly gtXl: BPCondition = (size: Size) => size.width >= this._breakpointValues.xl.max!;

  /**
   * Smaller than the sm breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than the min value of the sm breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.ltSm(size); // false
   */
  public readonly ltSm: BPCondition = (size: Size) => size.width < this._breakpointValues.sm.min!;
  /**
   * Smaller than the md breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than the min value of the md breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.ltMd(size); // false
   */
  public readonly ltMd: BPCondition = (size: Size) => size.width < this._breakpointValues.md.min!;
  /**
   * Smaller than the lg breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than the min value of the lg breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.ltLg(size); // false
   */
  public readonly ltLg: BPCondition = (size: Size) => size.width < this._breakpointValues.lg.min!;
  /**
   * Smaller than the xl breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than the min value of the xl breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.ltXl(size); // false
   */
  public readonly ltXl: BPCondition = (size: Size) => size.width < this._breakpointValues.xl.min!;
  /**
   * Smaller than the xxl breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than the min value of the xxl breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.ltXxl(size); // false
   */
  public readonly ltXxl: BPCondition = (size: Size) => size.width < this._breakpointValues.xxl.min!;

  /**
   * Greater than or equal to the xs breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the min value of the xs breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gteXs(size); // true
   */
  public readonly gteXs: BPCondition = (size: Size) => size.width >= this._breakpointValues.xs.min!;
  /**
   *  Greater than or equal to the sm breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the min value of the sm breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gteSm(size); // true
   */
  public readonly gteSm: BPCondition = (size: Size) => size.width >= this._breakpointValues.sm.min!;
  /**
   * Greater than or equal to the md breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the min value of the md breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gteMd(size); // true
   */
  public readonly gteMd: BPCondition = (size: Size) => size.width >= this._breakpointValues.md.min!;
  /**
   * Greater than or equal to the lg breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the min value of the lg breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gteLg(size); // true
   */
  public readonly gteLg: BPCondition = (size: Size) => size.width >= this._breakpointValues.lg.min!;
  /**
   * Greater than or equal to the xl breakpoint.
   * @param size The size to check.
   * @returns True if the width is greater than or equal to the min value of the xl breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.gteXl(size); // true
   */
  public readonly gteXl: BPCondition = (size: Size) => size.width >= this._breakpointValues.xl.min!;

  /**
   * Less than or equal to the xs breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than or equal to the max value of the xs breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.lteXs(size); // false
   */
  public readonly lteSm: BPCondition = (size: Size) => size.width <= this._breakpointValues.sm.max!;
  /**
   * Less than or equal to the sm breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than or equal to the max value of the sm breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.lteSm(size); // false
   * @example
   * const size = { width: 576, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.lteSm(size); // true
   */
  public readonly lteMd: BPCondition = (size: Size) => size.width <= this._breakpointValues.md.max!;
  /**
   * Less than or equal to the md breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than or equal to the max value of the md breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.lteMd(size); // false
   */
  public readonly lteLg: BPCondition = (size: Size) => size.width <= this._breakpointValues.lg.max!;
  /**
   * Less than or equal to the lg breakpoint.
   * @param size The size to check.
   * @returns True if the width is less than or equal to the max value of the lg breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.lteLg(size); // false
   */
  public readonly lteXl: BPCondition = (size: Size) => size.width <= this._breakpointValues.xl.max!;
  /**
   * Less than or equal to the xl breakpoint.
   * @param size The size to check.
   *  @returns True if the width is less than or equal to the max value of the xl breakpoint.
   * @example
   * const size = { width: 1920, height: 1080 };
   * const breakpoints = new ViewportBreakpoints();
   * breakpoints.lteXl(size); // true
   */
  public readonly lteXxl: BPCondition = (size: Size) => size.width <= this._breakpointValues.xxl.max!;
}
