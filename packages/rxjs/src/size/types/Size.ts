/**
 * @name Size
 * @description A size object with width and height properties.
 * @example
 * import { Size } from '@cpangular/rxjs/size';
 *
 * const size: Size = { width: 100, height: 100 };
 * console.log(size);
 * // { width: 100, height: 100 }
 *
 */

export interface Size {
  /**
   * The width.
   * @type {number}
   * @example
   * import { Size } from '@cpangular/rxjs/size';
   *
   * const size: Size = { width: 100, height: 100 };
   * console.log(size.width);
   * // 100
   *
   */
  width: number;
  /**
   * The height.
   * @type {number}
   * @example
   * import { Size } from '@cpangular/rxjs/size';
   *
   * const size: Size = { width: 100, height: 100 };
   * console.log(size.height);
   * // 100
   *
   */
  height: number;
}
