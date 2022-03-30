import Enumerable from "linq";
import { CSSStyleDeclarationBase } from "./CssPropertiesProxy";



export class ThemeStyleDeclaration{
  constructor(source: CSSStyleDeclaration){
    
  }
}


export class Theme extends CSSStyleDeclarationBase {
  private static readonly __instancesByRule: Map<CSSStyleRule, Theme> = new Map();
  private static readonly __instances:  Theme[] = [];
  private static readonly themes: Enumerable.IEnumerable<Theme> = Enumerable.from(this.__instances);


  public static for(source: CSSStyleRule) {
    if (!this.__instancesByRule.has(source)) {
      const theme = new Theme(source);
      this.__instancesByRule.set(source, theme);
      this.__instances.push(theme);
    }
    return this.__instancesByRule.get(source)!;
  }


  public static initialize() {
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
              Theme.for(rule);
            }
          }
        }
      }
    }
  }

  public static exists(themeId: string) {
    return this.themes.any((t) => t.id === themeId);
  }

  public static findById(themeId: string) {
    return this.themes.firstOrDefault((t) => t.id === themeId);
  }

  public static indexOf(themeId: string) {
    return this.themes.indexOf((t) => t.id === themeId);
  }

  public static create(name: string, dark: boolean = false, altName?:string): Theme {
    const prefix = dark ? "dark" : "light";
    const altPrefix = dark ? "light" : "dark";

    const id = `${prefix}-${name}`;
    const selector = `[theme-${dark ? "dark" : "light"}="${name}"]`;
    altName = `${altPrefix}-${altName ?? name}`
    const range = document.createRange();
    const frag = range.createContextualFragment(`
    <style theme-definition="${id}">
      -theme-definition-, html${selector}, ${selector} {
        --theme-id: ${id};
        --theme-name: ${name};
        --theme-is-dark: ${dark ? "1" : "0"};
        --theme-is-default: 0;
        --theme-is-default-alt: 0;
        --theme-alt: '${altName}';
      }
    </style>
    `);
    document.querySelector("head")?.append(frag);

    return new Theme(
      (
        document.querySelector(
          `style[theme-definition="${id}"]`
        ) as HTMLStyleElement
      ).sheet?.cssRules[0] as CSSStyleRule
    );
    /*new CSSStyleSheet().
    const styleTag = document.createElement('style');
    styleTag
    var c = new CSSStyleRule();
    */
    /*
    const id = `${dark ? 'dark' : 'light'}-${name}`;

    var style = document.createElement("style");
    style.setAttribute('type', 'text/scss');
    style.setAttribute('runtimeTheme', id);
    document.head.appendChild(style);

    const selector = `[theme-${dark ? 'dark' : 'light'}="${name}"]`;
    style.append(document.createTextNode(`-theme-definition-, html${selector}, ${selector} {
      --theme-id: ${id};
      --theme-name: ${name};
    }`));
    return new Theme(style.sheet?.cssRules.item(0)! as CSSStyleRule);
    /*
    const selector = `[theme-${dark ? 'dark' : 'light'}="${name}"]`;
    style.sheet?.insertRule(`-theme-definition-, html${selector}, ${selector} {
      --theme-id: ${id};
      --theme-name: ${name};
    }`);
    
    return new Theme(style.sheet?.cssRules.item(0)! as CSSStyleRule);*/
  }
  /*
  public readonly id: string = "";
  public readonly name: string = "";

  public readonly isDark: boolean = false;
  public readonly isDefaultTheme: boolean = false;
  public readonly isDefaultAltTheme: boolean = false;
  public readonly altThemeId?: string = undefined;
*/
  //public readonly background:Background;

  public get id() {
    return this.getProperty("id");
  }
  public get name() {
    return this.getProperty("name");
  }
  public get isDark() {
    return this.getProperty("isDark");
  }

  private constructor(public readonly source: CSSStyleRule) {
    super(source.style, "theme");


    /*this.id = source.style.getPropertyValue("--theme-id").trim();
    this.name = source.style.getPropertyValue("--theme-name").trim();
    this.isDark =
      source.style.getPropertyValue("--theme-is-dark").trim() === "1";
    this.isDefaultTheme =
      source.style.getPropertyValue("--theme-is-default").trim() === "1";
    this.isDefaultAltTheme =
      source.style.getPropertyValue("--theme-is-default-alt").trim() === "1";
    this.altThemeId = source.style.getPropertyValue("--theme-alt").trim();
    this.background = new Background(source.style);
*/
  }

  public writeRules() {
    /*const style = this.source.style;
    style.setProperty("--theme-id", this.id);
    style.setProperty("--theme-name", this.name);
    style.setProperty("--theme-is-dark", this.isDark ? "1" : "0");
    style.setProperty("--theme-is-default", this.isDefaultTheme ? "1" : "0");
    style.setProperty(
      "--theme-is-default-alt",
      this.isDefaultAltTheme ? "1" : "0"
    );
    style.setProperty("--theme-alt", this.altThemeId ?? "");

    */
  }
}

export class Background extends CSSStyleDeclarationBase {
  constructor(props: CSSStyleDeclaration) {
    super(props, "background");
  }

  public get background() {
    return this.getProperty("background");
  }

  public set background(value: string) {
    this.setProperty("background", value);
  }
}
