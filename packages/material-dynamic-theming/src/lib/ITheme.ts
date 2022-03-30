import { IThemePart } from './IThemePart';

export interface ITheme {
  id: string;
  shared: IThemePart;
  light: IThemePart;
  dark: IThemePart;
}
