import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-auth',
  template: ` <p>auth works!</p> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
