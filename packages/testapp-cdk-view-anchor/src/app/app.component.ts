import { Component } from "@angular/core";
import { ApplicationViewAnchors } from "@cpangular/app/application-shell";
import { listThemes, setActiveTheme, getActiveTheme } from "@cpangular/material-dynamic-theming";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  appViewAnchors = ApplicationViewAnchors;
  opened = true;
  themes = listThemes();
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
}
