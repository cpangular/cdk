import { InjectionToken } from "@angular/core";
import { ScrollMode } from "./ScrollMode";
import { IResolvable } from "@cpangular/cdk/value-resolver";
import { HeaderMode, HeaderPosition } from "./HeaderMode";
import { MenuMode } from "./MenuMode";
import { ScrollBehavior } from "./ScrollBehavior";


export interface ApplicationShellConfig {
  noticeScrollBehavior: IResolvable<ScrollBehavior>;
  headerScrollBehavior: IResolvable<ScrollBehavior>;
  toolbarHorizontalStartScrollBehavior: IResolvable<ScrollBehavior>;
  toolbarHorizontalEndScrollBehavior: IResolvable<ScrollBehavior>;
  footerScrollBehavior: IResolvable<ScrollBehavior>;
  toolbarVerticalStartScrollBehavior: IResolvable<ScrollBehavior>;
  toolbarVerticalEndScrollBehavior: IResolvable<ScrollBehavior>;
  menuStartScrollBehavior: IResolvable<ScrollBehavior>;
  menuEndScrollBehavior: IResolvable<ScrollBehavior>;

  mainMenuMode: IResolvable<MenuMode>;
  mainMenuIcon: IResolvable<string>;
  secondaryMenuMode: IResolvable<MenuMode>;
  secondaryMenuIcon: IResolvable<string>;

  headerColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  headerMenuColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;
  headerSecondaryColor: IResolvable<'primary' | 'accent' | 'warn' | ''>;

}

export const APPLICATION_SHELL_CONFIG: InjectionToken<Partial<ApplicationShellConfig>> = new InjectionToken("Application Shell Config");
