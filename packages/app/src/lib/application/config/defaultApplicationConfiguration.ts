import { IApplicationConfiguration } from "./ApplicationConfiguration";
import { defaultLayoutConfiguration } from "./defaultLayoutConfiguration";
import { defaultHeaderConfiguration } from "./HeaderConfiguration";
import { defaultMenuEndConfiguration, defaultMenuStartConfiguration } from "./MenuConfiguration";

export const defaultApplicationConfiguration: IApplicationConfiguration = {
  layout: { ...defaultLayoutConfiguration },
  header: { ...defaultHeaderConfiguration },
  menuStart: { ...defaultMenuStartConfiguration },
  menuEnd: { ...defaultMenuEndConfiguration },
};
