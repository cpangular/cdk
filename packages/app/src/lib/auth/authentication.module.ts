import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CpNgViewAnchorModule } from '@cpangular/cdk/view-anchor';
import { AuthenticationMenuComponent } from './components/authentication-menu/authentication-menu.component';

@NgModule({
  declarations: [AuthenticationMenuComponent],
  exports: [AuthenticationMenuComponent],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, CpNgViewAnchorModule],
  providers: [],
})
export class AuthenticationModule {}
