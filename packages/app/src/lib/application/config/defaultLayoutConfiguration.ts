import { ScrollBehavior } from "../components/layout/ScrollBehavior";
import { ILayoutConfiguration } from "./LayoutConfiguration";

export const defaultLayoutConfiguration: ILayoutConfiguration = {
    footerScrollBehavior: ScrollBehavior.FLOAT,
    menuStartScrollBehavior: ScrollBehavior.FLOAT,
    menuEndScrollBehavior: ScrollBehavior.FLOAT,
    rightToLeft: false
};
