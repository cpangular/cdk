import { IMaterialPalette } from './IMaterialPalette';
import { IMaterialScssPalette } from './IMaterialScssPalette';

export function convertToMaterialScssPalette(palette: IMaterialPalette): IMaterialScssPalette {
  const result = {
    contrast: {} as any,
  };
  for (const key in palette) {
    if (Object.prototype.hasOwnProperty.call(palette, key)) {
      const pair = palette[key];
      result[key as keyof typeof result] = pair[0] as string;
      result.contrast[key as keyof typeof result.contrast] = pair[1];
    }
  }
  return result as IMaterialScssPalette;
}
