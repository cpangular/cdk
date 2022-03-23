import { CdkScrollableModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ResizeModule } from "@cpangular/cdk/resize";
import { CpNgViewAnchorModule } from "@cpangular/cdk/view-anchor";
import { ApplicationFooterModule } from "../footer/footer.module";
import { ApplicationHeaderModule } from "../header/header.module";
import { ApplicationMenuEndModule } from "../menu-end/menu-end.module";
import { ApplicationMenuStartModule } from "../menu-start/menu-start.module";
import { LayerGroupComponent } from "./layer-group/layer-group.component";
import { LayerComponent } from "./layer/layer.component";
import { LayoutComponent } from "./layout.component";

@NgModule({
  declarations: [LayoutComponent, LayerComponent, LayerGroupComponent],
  imports: [
    CommonModule,
    ResizeModule,
    CdkScrollableModule,
    CpNgViewAnchorModule,
    ApplicationHeaderModule,
    ApplicationFooterModule,
    ApplicationMenuStartModule,
    ApplicationMenuEndModule,
  ],
  exports: [LayoutComponent],
})
export class ApplicationLayoutModule {}
