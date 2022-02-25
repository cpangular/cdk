import { IMaterialPalette } from "./IMaterialPalette";
import { IMaterialScssPalette } from "./IMaterialScssPalette";


export function convertFromMaterialScssPalette(
    palette: IMaterialScssPalette
): IMaterialPalette {
    const result = {} as any;
    for (const key in palette) {
        if (key !== "contrast" &&
            Object.prototype.hasOwnProperty.call(palette, key)) {
            const color = palette[key as keyof IMaterialScssPalette] as string;
            const contrast = palette.contrast[key as keyof typeof palette.contrast] as string;
            result[key] = [color, contrast];
        }
    }
    return result as IMaterialPalette;
}
