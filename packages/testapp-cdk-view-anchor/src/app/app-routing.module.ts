import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'basics',
    loadChildren: () => import('./pages/basics/basics.module').then(m => m.BasicsModule)
  },
  {
    path: '',
    redirectTo: 'basics',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
