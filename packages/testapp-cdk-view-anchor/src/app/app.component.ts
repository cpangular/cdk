import { Component } from "@angular/core";
import { isDarkMode, setDarkMode, toggleDarkMode, setActiveTheme } from "@cpangular/material-dynamic-theming";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  themes = isDarkMode();
  /*
  appViewAnchors = ApplicationViewAnchors;
  opened = true;
  activeTheme = getActiveTheme();


  public setTheme(id:string){
    setActiveTheme(id);
    this.activeTheme = getActiveTheme();
  }

  public previewTheme(id:string){
    setActiveTheme(id);
  }

  public resetTheme(){
    setActiveTheme(this.activeTheme);
  }
  */
  constructor() {
    setTimeout(() => {
      toggleDarkMode();
      setTimeout(() => {
        toggleDarkMode();
        setActiveTheme('my-theme-rev');
        setTimeout(() => {
          toggleDarkMode();
          setTimeout(() => {
            setDarkMode(undefined);
            setActiveTheme(undefined);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }
}
