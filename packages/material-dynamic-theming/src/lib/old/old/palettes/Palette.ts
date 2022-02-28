import { IPalette } from "./IPalette";
import { IPaletteColorPair } from "./IPaletteColorPair";

function t(num: number): string {
  return "  ".repeat(num);
}

export class Palette {
  private _data?: IPalette;

  constructor(data?: IPalette) {
    this._data = data;
  }

  public toScssValue(asVariable?: string): string {
    const palette = this._data;
    const colors: string[] = [];
    const contrasts: string[] = [];
    if(palette){
        for (const key in palette) {
          if (Object.prototype.hasOwnProperty.call(palette, key)) {
            const k = key as keyof IPalette;
            if (Array.isArray(palette[k])) {
              const value = palette[k] as IPaletteColorPair;
              colors.push(`${key}: ${value[0]}`);
              contrasts.push(`${key}: ${value[1]}`);
            }
          }
        }
    }

    let cssValue = `(\n`;
    var cssColors = t(1) + colors.join(`,\n${t(1)}`).trim();
    cssValue += cssColors + "\n";

    cssValue += t(1) + "contrast: (\n";
    var cssContrasts = t(2) + colors.join(`,\n${t(2)}`).trim();
    cssValue += cssContrasts + "\n";
    cssValue += t(1) + ")\n";

    cssValue += `)`;

    if (asVariable?.trim()) {
      cssValue = `$${asVariable}: ` + cssValue;
    }

    return cssValue;
  }
}
