import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@cpangular/app/auth';
import { BasicsComponent } from './basics.component';
import { ExamplesComponent } from './sections/examples/examples.component';
import { OverviewComponent } from './sections/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: BasicsComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'examples',
        component: ExamplesComponent,
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicsRoutingModule {}
