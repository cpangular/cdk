import { Component, ContentChild, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';

import { distinctUntilChanged, map, Observable, Subject, filter, MonoTypeOperatorFunction, shareReplay } from 'rxjs';
import { ApplicationAnchors } from './ApplicationAnchors';

export enum AppState {
  READY,
  CONTENT_BUSY,
  CONTENT_LOADING,
  BUSY,
  LOADING,
  INITIALIZING,
}

enum StateSelectionStrategy {
  NEWEST,
  LOWEST,
  HIGHEST,
}

export class StateStack<T extends number> {
  private _stateSubject: Subject<T> = new Subject<T>();
  private _stateChange: Observable<T> = this._stateSubject.pipe(distinctUntilChanged());

  protected _states: { state: T }[] = [];

  constructor(initialState: T, private readonly selectionStrategy: StateSelectionStrategy) {
    this._states.push({ state: initialState });
    this._stateSubject.next(initialState);
  }

  public addState(state: T): () => void {
    const stateRef = { state };
    this._states.push(stateRef);
    this.sort();
    this.emitChangeEvent();
    return () => {
      this.removeState(stateRef);
    };
  }

  public get stateChange(): Observable<T> {
    return this._stateChange;
  }

  protected emitChangeEvent(): void {
    this._stateSubject.next(this.getState());
  }

  protected removeState(stateRef: { state: T }) {
    this._states = this._states.filter((sr) => sr !== stateRef);
    this.sort();
    this.emitChangeEvent();
  }

  public getState(): T {
    return this._states[this._states.length - 1]?.state;
  }

  private sort() {
    if (this.selectionStrategy === StateSelectionStrategy.NEWEST) {
      return;
    }
    const dir = this.selectionStrategy === StateSelectionStrategy.LOWEST ? -1 : 1;
    this._states.sort((a, b) => {
      if (a.state > b.state) {
        return dir;
      } else if (a.state < b.state) {
        return dir * -1;
      }
      return 0;
    });
  }
}

export enum NavigationState {
  IDLE,
  NAVIGATING,
}

// RouterEvent | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll;

@Component({
  selector: 'cpng-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  public readonly anchors = ApplicationAnchors;

  @ContentChild('out')
  private routerOutlet!: RouterOutlet;

  public readonly routerState$ = this._router.events.pipe(
    map((r) => {
      console.log(r);
      if (r instanceof NavigationStart) {
        return NavigationState.NAVIGATING;
      } else if (r instanceof NavigationEnd || r instanceof NavigationCancel || r instanceof NavigationError) {
        return NavigationState.IDLE;
      }
      return undefined as unknown as NavigationState;
    }),
    filter((s) => s !== undefined),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log('routerOutlet ', this.routerOutlet);
    }, 100);
  }

  activate(evt: any): void {
    console.log('===============> ', evt);
  }
}
