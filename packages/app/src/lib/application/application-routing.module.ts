import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: "403",
    component: Error403Component
  },
  {
    path: "404",
    component: Error404Component
  },
  {
    path: "302",
    children: [{
      path: '**',
      component: RedirectComponent
    }]
  }
];
console.log('dasd')
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
