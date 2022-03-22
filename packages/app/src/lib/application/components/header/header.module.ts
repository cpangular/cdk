import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CpNgViewAnchorModule } from "@cpangular/cdk/view-anchor";
import { ApplicationHeaderComponent } from "./header.component";

@NgModule({
  declarations: [ApplicationHeaderComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, CpNgViewAnchorModule],
  exports: [ApplicationHeaderComponent],
})
export class ApplicationHeaderModule {}
