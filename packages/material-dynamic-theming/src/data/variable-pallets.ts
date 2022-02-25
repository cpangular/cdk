import { IPalette } from "../lib/palettes/IPalette";
import { IPaletteColorPair } from "../lib/palettes/IPaletteColorPair";

function varPairs(
  paletteName: string,
  value: string | number
): IPaletteColorPair {
  return [
    `var(--color-${paletteName}-${value})`,
    `var(--color-${paletteName}-${value}-contrast)`,
  ];
}

export const primaryVariablePalette: IPalette = {
  50: varPairs("primary", 50),
  100: varPairs("primary", 100),
  200: varPairs("primary", 200),
  300: varPairs("primary", 300),
  400: varPairs("primary", 400),
  500: varPairs("primary", 500),
  600: varPairs("primary", 600),
  700: varPairs("primary", 700),
  800: varPairs("primary", 800),
  900: varPairs("primary", 900),
  A100: varPairs("primary", 'A100'),
  A200: varPairs("primary", 'A200'),
  A400: varPairs("primary", 'A400'),
  A700: varPairs("primary", 'A700')
};
export const accentVariablePalette: IPalette = {
  50: varPairs("accent", 50),
  100: varPairs("accent", 100),
  200: varPairs("accent", 200),
  300: varPairs("accent", 300),
  400: varPairs("accent", 400),
  500: varPairs("accent", 500),
  600: varPairs("accent", 600),
  700: varPairs("accent", 700),
  800: varPairs("accent", 800),
  900: varPairs("accent", 900),
  A100: varPairs("accent", 'A100'),
  A200: varPairs("accent", 'A200'),
  A400: varPairs("accent", 'A400'),
  A700: varPairs("accent", 'A700')
};

export const warnVariablePalette: IPalette = {
    50: varPairs("warn", 50),
    100: varPairs("warn", 100),
    200: varPairs("warn", 200),
    300: varPairs("warn", 300),
    400: varPairs("warn", 400),
    500: varPairs("warn", 500),
    600: varPairs("warn", 600),
    700: varPairs("warn", 700),
    800: varPairs("warn", 800),
    900: varPairs("warn", 900),
    A100: varPairs("warn", 'A100'),
    A200: varPairs("warn", 'A200'),
    A400: varPairs("warn", 'A400'),
    A700: varPairs("warn", 'A700')
  };
