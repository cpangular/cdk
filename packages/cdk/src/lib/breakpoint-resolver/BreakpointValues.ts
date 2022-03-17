import { Breakpoints as MatBreakpoints } from "@angular/cdk/layout";


export class BreakpointValues {
    public static Handset: string = `${MatBreakpoints.Handset}`;
    public static HandsetLandscape: string = MatBreakpoints.HandsetLandscape;
    public static HandsetPortrait: string = MatBreakpoints.HandsetPortrait;
    public static Tablet: string = MatBreakpoints.Tablet;
    public static TabletLandscape: string = MatBreakpoints.TabletLandscape;
    public static TabletPortrait: string = MatBreakpoints.TabletPortrait;
    public static Web: string = MatBreakpoints.Web;
    public static WebLandscape: string = MatBreakpoints.WebLandscape;
    public static WebPortrait: string = MatBreakpoints.WebPortrait;
    public static Landscape: string = "(orientation: landscape)";
    public static Portrait: string = "(orientation: portrait)";
    public static XSmall: string = MatBreakpoints.XSmall;
    public static Small: string = MatBreakpoints.Small;
    public static Medium: string = MatBreakpoints.Medium;
    public static Large: string = MatBreakpoints.Large;
    public static XLarge: string = MatBreakpoints.XLarge;

    public static ["<XLarge"]: string = "(max-width: 1919.98px)";
    public static [">Large"]: string = "(min-width: 1920px)";
    public static [">=Large"]: string = "(min-width: 1280px)";
    public static ["<Large"]: string = "(max-width: 1279.98px)";
    public static ["<=Large"]: string = "(max-width: 1919.98px)";

    public static [">Medium"]: string = "(min-width: 1280px)";
    public static [">=Medium"]: string = "(min-width: 960px)";
    public static ["<Medium"]: string = "(max-width: 959.98px)";
    public static ["<=Medium"]: string = "(max-width: 1279.98px)";

    public static [">Small"]: string = "(min-width: 960px)";
    public static [">=Small"]: string = "(min-width: 600px)";
    public static ["<Small"]: string = "(max-width: 599.98px)";
    public static ["<=Small"]: string = "(max-width: 959.98px)";

    public static [">XSmall"]: string = "(min-width: 600px)";
}
