import { InjectionToken } from "@angular/core";
import { IResolvable } from "@cpangular/cdk/value-resolver";
import { HeaderMode, HeaderPosition } from "./HeaderMode";
import { MenuMode } from "./MenuMode";


export interface ApplicationShellConfig {
  headerMode: IResolvable<HeaderMode>;
  headerPosition: IResolvable<HeaderPosition>;
  mainHeaderColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  secondaryHeaderColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  leftMenuMode: IResolvable<MenuMode>;
  leftMenuButtonColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  rightMenuMode: IResolvable<MenuMode>;
  rightMenuButtonColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
}

export const APPLICATION_SHELL_CONFIG: InjectionToken<Partial<ApplicationShellConfig>> = new InjectionToken("Application Shell Config");
