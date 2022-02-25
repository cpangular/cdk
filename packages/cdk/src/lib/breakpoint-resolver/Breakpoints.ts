import { Breakpoints as MatBreakpoints } from '@angular/cdk/layout';

export class Breakpoints {
    public static HANDSET: string = `${MatBreakpoints.Handset}`;
    public static HANDSETLANDSCAPE: string = MatBreakpoints.HandsetLandscape;
    public static HANDSETPORTRAIT: string = MatBreakpoints.HandsetPortrait;
    public static LARGE: string = MatBreakpoints.Large;
    public static MEDIUM: string = MatBreakpoints.Medium;
    public static SMALL: string = MatBreakpoints.Small;
    public static TABLET: string = MatBreakpoints.Tablet;
    public static TABLETLANDSCAPE: string = MatBreakpoints.TabletLandscape;
    public static TABLETPORTRAIT: string = MatBreakpoints.TabletPortrait;
    public static WEB: string = MatBreakpoints.Web;
    public static WEBLANDSCAPE: string = MatBreakpoints.WebLandscape;
    public static WEBPORTRAIT: string = MatBreakpoints.WebPortrait;
    public static XLARGE: string = MatBreakpoints.XLarge;
    public static XSMALL: string = MatBreakpoints.XSmall;

    public static LANDSCAPE: string = '(orientation: landscape)';
    public static PORTRAIT: string = '(orientation: portrait)';

    public static ['<XLARGE']: string = '(max-width: 1919.98px)';
    public static ['>LARGE']: string = '(min-width: 1920px)';
    public static ['>=LARGE']: string = '(min-width: 1280px)';
    public static ['<LARGE']: string = '(max-width: 1279.98px)';
    public static ['<=LARGE']: string = '(max-width: 1919.98px)';

    public static ['>MEDIUM']: string = '(min-width: 1280px)';
    public static ['>=MEDIUM']: string = '(min-width: 960px)';
    public static ['<MEDIUM']: string = '(max-width: 959.98px)';
    public static ['<=MEDIUM']: string = '(max-width: 1279.98px)';

    public static ['>SMALL']: string = '(min-width: 960px)';
    public static ['>=SMALL']: string = '(min-width: 600px)';
    public static ['<SMALL']: string = '(max-width: 599.98px)';
    public static ['<=SMALL']: string = '(max-width: 959.98px)';

    public static ['>XSMALL']: string = '(min-width: 600px)';
}
