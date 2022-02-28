export interface IThemeRule {
  rule: CSSStyleRule;
  id: string;
  name: string;
  isDark: string;
  isDefaultTheme: string;
  isDefaultAlternateTheme: string;
  altThemeId: string;
}
let listThemes_cache: IThemeRule[];

export function scanThemes(): IThemeRule[] {
  const rules: IThemeRule[] = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets.item(i);
    let hasRules = false;
    // this will throw a security error for sheets we do not have access to
    try {
      hasRules = (sheet?.cssRules.length ?? 0) > 0;
    } catch {}

    if (hasRules) {
      for (let j = 0; j < sheet!.cssRules.length; j++) {
        const rule = sheet!.cssRules.item(j);
        if (rule instanceof CSSStyleRule) {
          if (rule.selectorText.startsWith("-theme-definition-")) {
            rules.push({
              id: rule.style.getPropertyValue("--theme-id").trim(),
              name: rule.style.getPropertyValue("--theme-name").trim(),
              isDark: rule.style.getPropertyValue("--theme-is-dark").trim(),
              isDefaultTheme: rule.style
                .getPropertyValue("--theme-is-default")
                .trim(),
              isDefaultAlternateTheme: rule.style
                .getPropertyValue("--theme-is-default-alt")
                .trim(),
              altThemeId: rule.style.getPropertyValue("--theme-alt").trim(),
              rule,
            });
          }
        }
      }
    }
  }
  listThemes_cache = rules;
  return rules;
}

export function listThemes() {
  if (!listThemes_cache) {
    scanThemes();
  }
  return listThemes_cache;
}

function setThemeAttribute(element: HTMLElement, themeId: string | undefined) {
  element.removeAttribute("theme-dark");
  element.removeAttribute("theme-light");
  if (themeId) {
    const p = themeId.split("-");
    element.setAttribute(`theme-${p.shift()}`, p.join("-"));
  }
}

function getActiveThemeIdFromAttribute(element: HTMLElement) {
  let att = element.getAttribute("theme-light");
  if (att) {
    return `light-${att}`;
  }
  att = element.getAttribute("theme-dark");
  if (att) {
    return `dark-${att}`;
  }
  const themes = listThemes();
  const theme = themes.find((t) => t.isDefaultTheme);
  if(theme){
    return theme.id;
  }
  return undefined;
}

function overrideActiveTheme(
  themeId: string | undefined,
  element: HTMLElement
) {
  const themes = listThemes();
  let theme: IThemeRule | undefined;
  theme = themes.find((t) => t.isDefaultTheme);
  if (themeId) {
    theme = themes.find((t) => t.id === themeId) ?? theme;
  }
  setThemeAttribute(element, theme?.id);
}



export function setActiveTheme(themeId: string | undefined) {
  overrideActiveTheme(themeId, document.documentElement);
}

export function getActiveTheme() {
  return getActiveThemeIdFromAttribute(document.documentElement);
}
