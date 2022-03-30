import { Component, OnInit } from "@angular/core";
import {
  listThemes,
  darkMode,
  activeTheme,
  setActiveTheme,
  setDarkMode,
} from "@cpangular/material-dynamic-theming";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  themeData = listThemes();
  get darkMode() {
    return darkMode() ?? "auto";
  }
  set darkMode(value: string) {
    if (value === "auto") {
      setDarkMode(undefined);
    } else {
      setDarkMode(value === "dark");
    }
  }

  get theme() {
    return activeTheme() ?? "auto";
  }

  set theme(value: string | undefined) {
    if (value === "auto") {
      setActiveTheme(undefined);
    } else {
      setActiveTheme(value);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
