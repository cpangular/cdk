import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

interface ApplicationStateModel {}

@State<ApplicationStateModel>({
  name: 'applicationState',
  defaults: {},
})
@Injectable()
export class ApplicationState {}
