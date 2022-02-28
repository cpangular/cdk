import { distinctUntilChanged, map, Observable, of, shareReplay } from "rxjs";
import { BPCondition } from "./BPCondition";
import { BPIfThen } from "./BPIfThen";
import { BreakpointInjectorService } from "./breakpoint-injector.service";
import { Breakpoints } from "./Breakpoints";
import { IBreakpointValueResolver } from "./IBreakpointValueResolver";
import { BreakpointObserver, MediaMatcher,LayoutModule } from "@angular/cdk/layout";
import { BreakpointResolverModule } from "./breakpoint-resolver.module";

function and(condition: BPCondition): string[] {
  if (!Array.isArray(condition)) {
    return and([condition])
  }
  const r = condition.map(c => Breakpoints[c.toUpperCase() as keyof typeof Breakpoints] as string ?? c);
  return r;
}

export class BreakpointValueResolver<T> implements IBreakpointValueResolver<T> {
  private _conditions: BPIfThen<T>[] = [];
  private _defaultValue?: T;
  private _injector = BreakpointInjectorService.get();
  private _observable?: Observable<T | undefined>;

  private constructor(conditions: BPIfThen<T>[] = [], defaultValue?: T) {
    this._conditions = conditions;
    this._defaultValue = defaultValue;
  }

  public static match<T>(
    condition: BPCondition,
    thenValue: T
  ): BreakpointValueResolver<T> {
    return new BreakpointValueResolver<T>([
      { condition: and(condition), thenValue },
    ]);
  }
  public static default<T>(
    defaultValue: T | undefined
  ): BreakpointValueResolver<T> {
    return new BreakpointValueResolver<T>([], defaultValue);
  }

  public match(condition: BPCondition, thenValue: T): BreakpointValueResolver<T> {
    return new BreakpointValueResolver<T>(
      [...this._conditions, { condition: and(condition), thenValue }],
      this._defaultValue
    );
  }
  public default(defaultValue: T | undefined): BreakpointValueResolver<T> {
    return new BreakpointValueResolver<T>([...this._conditions], defaultValue);
  }

  public get valueChange(): Observable<T | undefined> {
    if(!this._observable){
      const injector = BreakpointInjectorService.get();
      var bpo =  injector.breakpointObserver;
      var obs = this._conditions.map((c) => c.condition).flat();
      this._observable = bpo
        .observe(obs)
        .pipe(
          map((state) => {
            if (state.matches) {
              const match = this._conditions.find(
                (c) => {
                  const fails = c.condition.filter(c => !bpo.isMatched(c))
                  return !fails.length;
                }
              );
              return match === undefined ? this._defaultValue : match.thenValue;
            } else {
              return this._defaultValue;
            }
          }),
          distinctUntilChanged(),
          shareReplay(1)
        );
    }
  
    return this._observable;
  }
}
