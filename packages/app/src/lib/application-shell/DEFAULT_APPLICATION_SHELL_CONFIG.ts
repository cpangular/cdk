import { InjectionToken } from "@angular/core";

import { HeaderMode, HeaderPosition } from "./HeaderMode";
import { ApplicationShellConfig } from "./ApplicationShellConfig";
import { MenuMode } from "./MenuMode";
import { when, otherwise } from "@cpangular/cdk/value-resolver";
import { size } from "@cpangular/cdk/breakpoint-resolver";

export const DEFAULT_APPLICATION_SHELL_CONFIG: InjectionToken<ApplicationShellConfig> =
  new InjectionToken("DefaultApplication Shell Config", {
    providedIn: "root",
    factory: () => {
      return {
        headerMode: when(
          size("(max-height: 959.98px)", HeaderMode.SCROLL_AWAY),
          otherwise(HeaderMode.ALWAYS),
        ),
        headerPosition: when(
          size("<=small", HeaderPosition.INNER),
          otherwise(HeaderPosition.OUTER)
        ),
        mainHeaderColor: "primary",
        secondaryHeaderColor: "",
        leftMenuButtonColor: "",
        rightMenuButtonColor: "",

        leftMenuMode: when(
          size("<=small", MenuMode.OVER),
          otherwise(MenuMode.FIXED)
        ),
        rightMenuMode: when(
          size("<=small", MenuMode.PUSH),
          otherwise(MenuMode.FIXED)
        ),
      };
    },
  });
