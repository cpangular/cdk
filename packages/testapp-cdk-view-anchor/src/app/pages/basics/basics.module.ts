import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicsRoutingModule } from './basics-routing.module';
import { BasicsComponent } from './basics.component';
import { OverviewComponent } from './sections/overview/overview.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { CpNgViewAnchorModule } from '@cpangular/cdk/view-anchor';
import { ExamplesComponent } from './sections/examples/examples.component';
import { ApplicationShellModule } from '@cpangular/app/application-shell';
import { IFrameModule } from '@cpangular/cdk/iframe';

@NgModule({
  declarations: [BasicsComponent, OverviewComponent, ExamplesComponent],
  imports: [
    CommonModule,
    BasicsRoutingModule,
    MatTabsModule,
    LayoutModule,
    MatListModule,
    CpNgViewAnchorModule,
    ApplicationShellModule,
    IFrameModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class BasicsModule {}
