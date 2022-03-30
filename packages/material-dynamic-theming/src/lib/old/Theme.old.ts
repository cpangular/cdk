export interface IHasPaletteColors {
  [key: string | number]: PaletteColor;
}

export class Palette implements IHasPaletteColors {
  constructor(
    // @ts-ignore
    private readonly _parent: Theme,
    // @ts-ignore
    private readonly _key: string
  ) {}

  [key: string | number]: PaletteColor;
}

export class PaletteColor {
  color: string = "";
  contrast: string = "";

  constructor(
    private readonly _parent: Palette,
    private readonly _key: string | number
  ) {}
}

export interface ThemePalettes {
  primary: Palette;
  accent: Palette;
  warn: Palette;
  [key: string]: Palette | undefined;
}

export class BackgroundPalette {
  appBar: string = "";
  background: string = "";
  card: string = "";
  dialog: string = "";
  disabledButton: string = "";
  disabledButtonToggle: string = "";
  disabledListOption: string = "";
  focusedButton: string = "";
  hover: string = "";
  raisedButton: string = "";
  selectedButton: string = "";
  selectedDisabledButton: string = "";
  statusBar: string = "";
  tooltip: string = "";
  unselectedChip: string = "";

  constructor(private readonly _parent: Theme) {}
}

export class ForegroundPalette {
  base: string = "";
  disabled: string = "";
  disabledButton: string = "";
  disabledText: string = "";
  divider: string = "";
  dividers: string = "";
  elevation: string = "";
  hintText: string = "";
  icon: string = "";
  icons: string = "";
  secondaryText: string = "";
  sliderMin: string = "";
  sliderOff: string = "";
  sliderOffActive: string = "";
  text: string = "";
  constructor(private readonly _parent: Theme) {}
}

export class Theme {
  public source: string = "script";
  public id: string = "";
  public name: string = "";
  public isDark: boolean = false;
  public altThemeId?: string = undefined;
  public isDefaultTheme: boolean = false;
  public isDefaultAltTheme: boolean = false;
  palettes: ThemePalettes = {
    primary: new Palette(this, "primary"),
    accent: new Palette(this, "accent"),
    warn: new Palette(this, "warn"),
  };
  background: BackgroundPalette = new BackgroundPalette(this);
  foreground: ForegroundPalette = new ForegroundPalette(this);
}

export class Theme2 {
  private static readonly __instances: Map<
    CSSStyleRule | HTMLStyleElement,
    Theme2
  > = new Map();
  public static for(source: CSSStyleRule | HTMLStyleElement) {
    if (!this.__instances.has(source)) {
      this.__instances.set(source, new Theme2(source));
    }
    return this.__instances.get(source)!;
  }

  private constructor(source: CSSStyleRule | HTMLStyleElement) {
    
  }
}
