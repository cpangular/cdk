import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '../../state/authentication.actions';
import { AuthenticationState } from '../../state/authentication.state';

@Component({
  selector: 'cpng-authentication-menu',
  templateUrl: './authentication-menu.component.html',
  styleUrls: ['./authentication-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationMenuComponent implements OnInit {
  @Input()
  public buttonAnchor?: symbol | string;

  @Select(AuthenticationState.user) user$!: Observable<ReturnType<typeof AuthenticationState.user>>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
