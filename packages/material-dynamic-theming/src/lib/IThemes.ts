import { ITheme } from './ITheme';

export interface IThemes {
  defaultTheme: string;
  defaultDark: boolean;
  propertyPrefix: string;
  themes: { [themeId: string]: ITheme };
}
