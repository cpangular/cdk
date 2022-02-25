import { InjectionToken } from "@angular/core";
import { IResolvable, match } from "@cpangular/cdk/breakpoint-resolver";
import { HeaderMode } from "./HeaderMode";
import { MenuMode } from "./MenuMode";



export interface ApplicationShellConfig {
  headerMode: IResolvable<HeaderMode>;
  mainHeaderColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  secondaryHeaderColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  leftMenuMode: IResolvable<MenuMode>;
  leftMenuButtonColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  rightMenuMode: IResolvable<MenuMode>;
  rightMenuButtonColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
}

export const APPLICATION_SHELL_CONFIG: InjectionToken<Partial<ApplicationShellConfig>> = new InjectionToken("Application Shell Config");
