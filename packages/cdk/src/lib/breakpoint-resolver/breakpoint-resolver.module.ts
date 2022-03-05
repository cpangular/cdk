import { BreakpointObserver } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Observable, shareReplay, Subject } from "rxjs";
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [],
})
export class BreakpointResolverModule {
  private static _breakpointObserverSubject = new Subject<BreakpointObserver>();
  public static breakpointObserver$: Observable<BreakpointObserver> =
    BreakpointResolverModule._breakpointObserverSubject.pipe(shareReplay(1));

  constructor(obs: BreakpointObserver) {
    BreakpointResolverModule.breakpointObserver$.subscribe();
    BreakpointResolverModule._breakpointObserverSubject.next(obs);
    
  }
}
