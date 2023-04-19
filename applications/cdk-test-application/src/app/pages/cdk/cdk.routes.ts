import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'size',
    loadChildren: () => import('./size/size.routes').then(m => m.routes)
  },
  {
    path: '',
    redirectTo: 'size',
    pathMatch: 'full'
  }

];
