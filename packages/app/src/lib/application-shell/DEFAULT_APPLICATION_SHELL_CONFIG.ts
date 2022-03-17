import { InjectionToken } from "@angular/core";

import { HeaderMode, HeaderPosition } from "./HeaderMode";
import { ApplicationShellConfig } from "./ApplicationShellConfig";
import { MenuMode } from "./MenuMode";
import { when, otherwise } from "@cpangular/cdk/value-resolver";
import { size } from "@cpangular/cdk/breakpoint-resolver";
import { ScrollMode } from "./ScrollMode";
import { ScrollBehavior } from "./ScrollBehavior";

export const DEFAULT_APPLICATION_SHELL_CONFIG: InjectionToken<ApplicationShellConfig> =
  new InjectionToken("DefaultApplication Shell Config", {
    providedIn: "root",
    factory: () => {
      return {
        noticeScrollBehavior: ScrollBehavior.FIXED,
        headerScrollBehavior: when(
          size("LargeOrGreater", ScrollBehavior.FIXED),
          otherwise(ScrollBehavior.FLOAT)
        ),
        toolbarHorizontalStartScrollBehavior: ScrollBehavior.FIXED,
        toolbarHorizontalEndScrollBehavior: ScrollBehavior.SCROLL,
        footerScrollBehavior: ScrollBehavior.SCROLL,
        toolbarVerticalStartScrollBehavior: ScrollBehavior.FIXED,
        toolbarVerticalEndScrollBehavior: ScrollBehavior.FIXED,
        menuStartScrollBehavior: ScrollBehavior.FIXED,
        menuEndScrollBehavior: ScrollBehavior.FIXED,
        mainMenuMode: when(
          size("MediumOrGreater", MenuMode.FIXED),
          otherwise(MenuMode.OVER)
        ),
        mainMenuIcon: when(
          size("Small", 'apps'),
          otherwise('menu')
        ),
        secondaryMenuMode: MenuMode.FIXED,
        secondaryMenuIcon: 'menu',

        headerColor: "accent",
        headerMenuColor: "",
        headerSecondaryColor: "",
      };
    },
  });
