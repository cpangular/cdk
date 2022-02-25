import { InjectionToken } from "@angular/core";
import { match } from "@cpangular/cdk/breakpoint-resolver";
import { HeaderMode } from "./HeaderMode";
import { ApplicationShellConfig } from "./ApplicationShellConfig";
import { MenuMode } from "./MenuMode";


export const DEFAULT_APPLICATION_SHELL_CONFIG: InjectionToken<ApplicationShellConfig> = new InjectionToken("DefaultApplication Shell Config", {
    providedIn: "root",
    factory: () => {
        return {
            headerMode: match("<=small", HeaderMode.SCROLL_AWAY).default(
                HeaderMode.ALWAYS
            ),
            mainHeaderColor: 'primary',
            secondaryHeaderColor: '',
            leftMenuButtonColor: '',
            rightMenuButtonColor: '',
            leftMenuMode: match("<=small", MenuMode.OVER).default(MenuMode.FIXED),
            rightMenuMode: match("<=small", MenuMode.PUSH).default(MenuMode.FIXED),
        };
    },
});
