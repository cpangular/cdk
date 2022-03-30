import { IBackgroundPalette } from '../IBackgroundPalette';

export interface IMaterialScssForegroundPalette extends IBackgroundPalette {
  base: string;
  divider: string;
  dividers: string;
  disabled: string;
  'disabled-button': string;
  'disabled-text': string;
  elevation: string;
  'hint-text': string;
  'secondary-text': string;
  icon: string;
  icons: string;
  text: string;
  'slider-min': string;
  'slider-off': string;
  'slider-off-active': string;
}
