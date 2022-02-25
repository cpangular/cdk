import { InjectionToken, inject } from "@angular/core";
import { ApplicationShellConfig, APPLICATION_SHELL_CONFIG } from "./ApplicationShellConfig";
import { DEFAULT_APPLICATION_SHELL_CONFIG } from "./DEFAULT_APPLICATION_SHELL_CONFIG";

export const FINAL_APPLICATION_SHELL_CONFIG: InjectionToken<ApplicationShellConfig> = new InjectionToken("Application Shell Config", {
    providedIn: "root",
    factory: () => {
        const defaultConfig = inject(DEFAULT_APPLICATION_SHELL_CONFIG);
        const overrideConfig = inject(APPLICATION_SHELL_CONFIG);
        return {
            ...defaultConfig,
            ...(overrideConfig ?? {})
        };
    },
});
