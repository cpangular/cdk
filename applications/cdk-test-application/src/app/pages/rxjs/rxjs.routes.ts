import { Routes } from '@angular/router';
import { RxjsSizePageComponent } from './size/size.component';

export const routes: Routes = [
  {
    path: 'size',
    component: RxjsSizePageComponent
  },
  {
    path: '',
    redirectTo: 'size',
    pathMatch: 'full'
  }
];
