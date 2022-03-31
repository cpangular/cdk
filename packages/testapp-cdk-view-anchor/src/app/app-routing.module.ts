import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitAuthenticationGuard, IsAuthenticatedGuard } from '@cpangular/app/auth';

const routes: Routes = [
  {
    path: 'basics',
    //   canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./pages/basics/basics.module').then((m) => m.BasicsModule),
  },
  {
    path: '',
    redirectTo: 'basics',
    pathMatch: 'full',
  },
  /*
  {
    path: "",
  //  canActivate: [InitAuthenticationGuard],
    children: [
      {
        path: "basics",
     //   canActivate: [IsAuthenticatedGuard],
        loadChildren: () =>
          import("./pages/basics/basics.module").then((m) => m.BasicsModule),
      },
      {
        path: "",
        redirectTo: "basics",
        pathMatch: "full",
      },
    ],
  },
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      urlUpdateStrategy: 'eager',
      canceledNavigationResolution: 'computed',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
