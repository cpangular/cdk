import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreakpointInjectorService } from "./breakpoint-injector.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [BreakpointInjectorService],
})
export class BreakpointResolverModule {
  constructor(breakpointInjectorService: BreakpointInjectorService) {}
}
