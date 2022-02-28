import { IPaletteColorPair } from "../IPaletteColorPair";
import { IPalette } from "../IPalette";


export interface IMaterialPalette extends IPalette {
    50: IPaletteColorPair;
    100: IPaletteColorPair;
    200: IPaletteColorPair;
    300: IPaletteColorPair;
    400: IPaletteColorPair;
    500: IPaletteColorPair;
    600: IPaletteColorPair;
    700: IPaletteColorPair;
    800: IPaletteColorPair;
    900: IPaletteColorPair;
    A100: IPaletteColorPair;
    A200: IPaletteColorPair;
    A400: IPaletteColorPair;
    A700: IPaletteColorPair;
   
    default: IPaletteColorPair;
    lighter: IPaletteColorPair;
    darker: IPaletteColorPair;
    text: string;
}


