import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { AuthenticationState } from "./state/authentication.state";

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule, 
    //NgxsModule.forFeature([AuthenticationState])
  ],
  providers: [],
})
export class AuthenticationModule {}
