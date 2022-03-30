import { ITheme } from "./ITheme";
import { IThemes } from "./IThemes";

const STORE_MODE = "theme-mode";
const STORE_THEME = "theme-id";

let listThemes_cache: IThemes;

function toPropName(name: string, prefix: string = "theme") {
  if (!name.startsWith(`${prefix}-`)) {
    name = `${prefix}-${name}`;
  }
  return `--${name}`;
}

function forEachRule(predicate: (rule: CSSStyleRule) => void) {
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets.item(i);
    let hasRules = false;
    // this will throw a security error for sheets we do not have access to
    try {
      hasRules = (sheet?.cssRules.length ?? 0) > 0;
    } catch {}
    if (hasRules) {
      for (let j = 0; j < sheet!.cssRules.length; j++) {
        for (let j = 0; j < sheet!.cssRules.length; j++) {
          const rule = sheet!.cssRules.item(j);
          if (rule instanceof CSSStyleRule) {
            predicate(rule);
          }
        }
      }
    }
  }
}

export function scanThemes(): IThemes {
  const themeData: IThemes = {
    propertyPrefix: "theme",
    themes: {},
  } as IThemes;

  forEachRule((rule) => {
    if (rule.selectorText.startsWith("-theme-prefix-")) {
      themeData.propertyPrefix = rule.style.getPropertyValue("--prefix").trim();
    }
  });

  const prefix = themeData.propertyPrefix;

  forEachRule((rule) => {
    if (rule.selectorText.startsWith("-theme-definition-,")) {
      const isDefault = rule.selectorText.indexOf(":root,") !== -1;
      const themeIdProp = toPropName("theme-id", prefix);
      const themeId = rule.style.getPropertyValue(themeIdProp).trim();
      const themeModeProp = toPropName("theme-mode", prefix);
      const themeMode = rule.style.getPropertyValue(themeModeProp).trim() as
        | "shared"
        | "light"
        | "dark";
      if (isDefault) {
        themeData.defaultTheme = themeId;
        if (themeMode !== "shared") {
          themeData.defaultDark = themeMode === "dark";
        }
      }

      if (!themeData.themes[themeId]) {
        themeData.themes[themeId] = {
          id: themeId,
        } as ITheme;
      }

      const theme = themeData.themes[themeId];
      theme[themeMode] = {
        rule,
      };
    }
  });

  listThemes_cache = themeData;
  return themeData;
}

export function listThemes() {
  if (!listThemes_cache) {
    scanThemes();
  }
  return listThemes_cache;
}

function preferredMode() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function darkMode(): "light" | "dark" | undefined {
  return (
    (document.documentElement.getAttribute("theme-mode") as "light" | "dark") ||
    undefined
  );
}

export function isDarkMode(): boolean {
  const themes = listThemes();
  const themeMode =
    document.documentElement.getAttribute("theme-mode") ??
    preferredMode() ??
    (themes.defaultDark ? "dark" : "light");
  return themeMode === "dark";
}

export function setDarkMode(value: boolean | undefined) {
  setMode(value === false ? "light" : !value ? undefined : "dark");
}

export function setMode(mode: string | undefined) {
  if (!mode) {
    document.documentElement.removeAttribute("theme-mode");
    localStorage.removeItem(STORE_MODE);
  } else {
    mode = mode === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("theme-mode", mode);
    localStorage.setItem(STORE_MODE, mode);
  }
}

export function toggleDarkMode() {
  setDarkMode(!isDarkMode());
}

export function activeTheme(): string {
  return (
    getOverrideTheme(document.documentElement) ?? listThemes().defaultTheme
  );
}

export function setActiveTheme(theme: string | undefined) {
  overrideTheme(document.documentElement, theme);
  theme
    ? localStorage.setItem(STORE_THEME, theme)
    : localStorage.removeItem(STORE_THEME);
}

export function overrideTheme(element: HTMLElement, theme: string | undefined) {
  if (!theme) {
    element.removeAttribute("theme");
  } else {
    element.setAttribute("theme", theme);
  }
}

export function getOverrideTheme(element: HTMLElement) {
  return element.getAttribute("theme");
}

export function resetActiveTheme() {
  setDarkMode(undefined);
  setActiveTheme(undefined);
}

(() => {
  setMode(localStorage.getItem(STORE_MODE) ?? undefined);
  setActiveTheme(localStorage.getItem(STORE_THEME) ?? undefined)
})();
