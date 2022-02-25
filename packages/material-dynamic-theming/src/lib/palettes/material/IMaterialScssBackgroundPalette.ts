import { IBackgroundPalette } from "../IBackgroundPalette";

export interface IMaterialScssBackgroundPalette extends IBackgroundPalette {
    "status-bar": string;
    "app-bar": string;
    background: string;
    hover: string;
    card: string;
    dialog: string;
    "disabled-button": string;
    "raised-button": string;
    "focused-button": string;
    "selected-button": string;
    "selected-disabled-button": string;
    "disabled-button-toggle": string;
    "unselected-chip": string;
    "disabled-list-option": string;
    tooltip: string;
}
