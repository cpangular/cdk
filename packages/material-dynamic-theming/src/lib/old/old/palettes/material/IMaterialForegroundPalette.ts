import { IBackgroundPalette } from '../IBackgroundPalette';

export interface IMaterialForegroundPalette extends IBackgroundPalette {
  base: string;
  divider: string;
  dividers: string;
  disabled: string;
  disabledButton: string;
  disabledText: string;
  elevation: string;
  hintText: string;
  secondaryText: string;
  icon: string;
  icons: string;
  text: string;
  sliderTin: string;
  sliderOff: string;
  sliderOffActive: string;
}
