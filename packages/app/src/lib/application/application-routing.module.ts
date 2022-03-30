import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Error403Component } from "./pages/error403/error403.component";
import { Error404Component } from "./pages/error404/error404.component";
import { RedirectComponent } from "./pages/redirect/redirect.component";

const routes: Routes = [
  {
    path: "403",
    component: Error403Component,
  },
  {
    path: "404",
    component: Error404Component,
  },
  {
    path: "302",
    children: [
      {
        path: "**",
        component: RedirectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
