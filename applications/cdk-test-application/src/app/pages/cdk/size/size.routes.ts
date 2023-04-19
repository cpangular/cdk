import { Routes } from '@angular/router';
import { SizeChangeEventsComponent } from './size-change-events/size-change-events.component';
import { SizeCssPropertiesComponent } from './size-css-properties/size-css-properties.component';
import { SizeComponent } from './size.component';

export const routes: Routes = [
  {
    path: '',
    component: SizeComponent,
    children: [
      {
        path: 'change-events',
        component: SizeChangeEventsComponent
      },
      {
        path: 'css-properties',
        component: SizeCssPropertiesComponent
      },
      {
        path: '',
        redirectTo: 'change-events',
        pathMatch: 'full'
      }
    ]
  }
];
