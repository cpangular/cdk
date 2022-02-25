import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable, Injector } from "@angular/core";

@Injectable()
export class BreakpointInjectorService {
  private static __instance: BreakpointInjectorService;

  public static get(): BreakpointInjectorService {
    return BreakpointInjectorService.__instance;
  }

  constructor(
    public breakpointObserver: BreakpointObserver
    ) {
    if(!BreakpointInjectorService.__instance){
      BreakpointInjectorService.__instance = this;
    }
  }
}
