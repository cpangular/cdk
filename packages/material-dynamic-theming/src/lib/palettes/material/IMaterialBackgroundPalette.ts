import { IBackgroundPalette } from "../IBackgroundPalette";

export interface IMaterialBackgroundPalette extends IBackgroundPalette {
    statusBar: string;
    appBar: string;
    background: string;
    hover: string;
    card: string;
    dialog: string;
    disabledButton: string;
    raisedButton: string;
    focusedButton: string;
    selectedButton: string;
    selectedDisabledButton: string;
    disabledButtonToggle: string;
    unselectedChip: string;
    disabledListOption: string;
    tooltip: string;
}
