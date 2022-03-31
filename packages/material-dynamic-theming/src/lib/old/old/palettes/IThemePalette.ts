import { IPalette } from './IPalette';
import { IPaletteColorPair } from './IPaletteColorPair';

export interface IThemePalette {
  default: string | number;
  lighter: string | number;
  darker: string | number;
  text: string | number;
  [k: string]: IPaletteColorPair | unknown;
}
