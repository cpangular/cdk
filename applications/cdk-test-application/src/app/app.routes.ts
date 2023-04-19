import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'rxjs',
    loadChildren: () => import('./pages/rxjs/rxjs.routes').then(m => m.routes)
  },
  {
    path: 'cdk',
    loadChildren: () => import('./pages/cdk/cdk.routes').then(m => m.routes)
  },
  {
    path: '',
    redirectTo: 'rxjs',
    pathMatch: 'full'
  }
];
