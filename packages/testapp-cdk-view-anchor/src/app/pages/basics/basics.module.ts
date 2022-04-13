import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { IFrameModule } from '@cpangular/cdk/iframe';
import { CpNgViewAnchorModule } from '@cpangular/cdk/view-anchor';
import { BasicsRoutingModule } from './basics-routing.module';
import { BasicsComponent } from './basics.component';
import { ExamplesComponent } from './sections/examples/examples.component';
import { OverviewComponent } from './sections/overview/overview.component';

@NgModule({
  declarations: [BasicsComponent, OverviewComponent, ExamplesComponent],
  imports: [
    CommonModule,
    BasicsRoutingModule,
    MatTabsModule,
    MatListModule,
    CpNgViewAnchorModule,

    IFrameModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class BasicsModule {}
