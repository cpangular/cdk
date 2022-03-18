import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ApplicationRoutingModule } from "./application-routing.module";
import { Error403Component } from "./error403/error403.component";
import { Error404Component } from "./error404/error404.component";
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [Error404Component, Error403Component, RedirectComponent],
  imports: [CommonModule, ApplicationRoutingModule],
})
export class ApplicationModule {}
