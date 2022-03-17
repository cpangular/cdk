import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IFrameComponent } from "./iframe.component";

@NgModule({
  declarations: [IFrameComponent],
  exports: [IFrameComponent],
  imports: [CommonModule],
})
export class IFrameModule {}
