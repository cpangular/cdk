
import { primaryVariablePalette } from "../data/variable-pallets";
import { Palette } from "../lib/palettes/Palette";

primaryVariablePalette

var palette = new Palette(primaryVariablePalette);

console.log(palette);
console.log(palette.toScssValue('somePalette'));
