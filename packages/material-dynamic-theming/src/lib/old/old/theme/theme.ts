import { IBackgroundPalette } from '../palettes/IBackgroundPalette';
import { IForegroundPalette } from '../palettes/IForegroundPalette';
import { IThemePalette } from '../palettes/IThemePalette';

export interface ITheme {
  primary: IThemePalette;
  accent: IThemePalette;
  warn: IThemePalette;
  isDark: boolean;
  foreground: IForegroundPalette;
  background: IBackgroundPalette;
}
