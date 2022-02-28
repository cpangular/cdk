import {
  BackgroundPalette,
  ForegroundPalette,
  Palette,
  PaletteColor,
  Theme,
  Theme2,
  ThemePalettes,
} from "./Theme.old";
import { camelCase } from "change-case";
interface ICssThemeData {
  theme: { [key: string]: string };
  color: { [key: string]: string };
  background: { [key: string]: string };
  foreground: { [key: string]: string };
}
export class CssUtils {
  public static initializeThemes() {
    var themes: Theme2[] = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets.item(i);
      try {
        if (sheet?.cssRules) {
          for (let j = 0; j < sheet.cssRules.length; j++) {
            const rule = sheet.cssRules.item(j);
            if (rule instanceof CSSStyleRule) {
              if (rule.selectorText.startsWith("-theme-definition-")) {
                themes.push(Theme2.for(rule));
              }
            }
          }
        }
      } catch {}
    }
    return themes;
  }
/*
  private static findCssThemeData() {
    this.initializeThemes();

    var themes: ICssThemeData[] = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets.item(i);
      try {
        if (sheet?.cssRules) {
          for (let j = 0; j < sheet.cssRules.length; j++) {
            const rule = sheet.cssRules.item(j);
            if (rule instanceof CSSStyleRule) {
              if (rule.selectorText.startsWith("-theme-definition-")) {
                const themeDef: ICssThemeData = {
                  theme: {},
                  color: {},
                  background: {},
                  foreground: {},
                };
                for (let k = 0; k < rule.style.length; k++) {
                  const style = rule.style.item(k);
                  if (style.startsWith("--")) {
                    let name = style.substring(2);
                    const p = name.split("-");
                    const cat = p.shift() as keyof ICssThemeData;
                    name = p.join("-");
                    const val = rule.style.getPropertyValue(style);
                    themeDef[cat][name] = val.trim();
                  }
                }
                themes.push(themeDef);
              }
            }
          }
        }
      } catch {}
    }
    return themes;
  }

  private static cssDataToTheme(data: ICssThemeData) {
    const theme = new Theme();
    theme.source = "dom-stylesheets";
    theme.id = data.theme["id"];
    theme.name = data.theme["name"];
    theme.altThemeId = data.theme["alt"];
    theme.isDark = data.theme["is-dark"] === "1";
    theme.isDefaultTheme = data.theme["is-default"] === "1";
    theme.isDefaultAltTheme = data.theme["is-default=alt"] === "1";

    for (const key in data.background) {
      if (Object.prototype.hasOwnProperty.call(data.background, key)) {
        const value = data.background[key];
        const jsKey = camelCase(key) as keyof BackgroundPalette;
        theme.background[jsKey] = value;
      }
    }

    for (const key in data.foreground) {
      if (Object.prototype.hasOwnProperty.call(data.foreground, key)) {
        const value = data.foreground[key];
        const jsKey = camelCase(key) as keyof ForegroundPalette;
        theme.foreground[jsKey] = value;
      }
    }

    for (const key in data.color) {
      if (Object.prototype.hasOwnProperty.call(data.color, key)) {
        const isContrast = key.endsWith("-contrast");
        const value = data.color[key];
        const p = key.split("-");

        if (isContrast) {
          p.pop();
        }

        const paletteName = camelCase(p.shift()!) as keyof ThemePalettes;
        const colorName = camelCase(p.join("-")) as keyof Palette;

        if (!theme.palettes[paletteName]) {
          theme.palettes[paletteName] = new Palette(
            theme,
            paletteName as string
          );
        }
        const palette = theme.palettes[paletteName]!;

        if (!palette[colorName]) {
          palette[colorName] = new PaletteColor(palette, colorName);
        }

        if (isContrast) {
          palette[colorName].contrast = value;
        } else {
          palette[colorName].color = value;
        }
      }
    }

    return theme;
  }

  public static readThemesFromDom(): Theme[] {
    const themes: Theme[] = [];
    const themeData = this.findCssThemeData();
    for (const data of themeData) {
      themes.push(this.cssDataToTheme(data));
    }
    return themes;
  }

  public static applyTheme(
    themeId: string,
    element: HTMLElement = document.documentElement
  ) {
    const p = themeId.split("-");
    const type = p.shift();
    const name = p.join("-");
    element.setAttribute(`theme-${type}`, name);
  }
  */
}
