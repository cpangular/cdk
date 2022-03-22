import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ApplicationRoutingModule } from "./application-routing.module";
import { ApplicationLayoutModule } from "./components/layout/layout.module";
import { Error403Component } from "./pages/error403/error403.component";
import { Error404Component } from "./pages/error404/error404.component";
import { RedirectComponent } from "./pages/redirect/redirect.component";

@NgModule({
  declarations: [Error404Component, Error403Component, RedirectComponent],
  imports: [CommonModule, ApplicationRoutingModule, ApplicationLayoutModule],
  exports: [ApplicationLayoutModule],
})
export class ApplicationModule {}
