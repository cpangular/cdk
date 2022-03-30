import { CssUtils } from './CssUtils';
//import { Theme } from "./Theme.old";
import Enumerable from 'linq';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export class ThemeManager {
  /*
  private readonly _themes: Theme[] = CssUtils.readThemesFromDom();
  private readonly _themesEnumerable: Enumerable.IEnumerable<Theme> =
    Enumerable.from(this._themes);

  private readonly _defaultThemeSubject: BehaviorSubject<Theme> =
    new BehaviorSubject(
      this._themesEnumerable.where((theme) => theme.isDefaultTheme).single()
    );
  public readonly defaultTheme$: Observable<Theme> =
    this._defaultThemeSubject.pipe(distinctUntilChanged());
  public get defaultTheme() {
    return this._defaultThemeSubject.value;
  }
  public readonly defaultThemeId$: Observable<string> = this.defaultTheme$.pipe(
    map((theme) => theme.id)
  );
  public get defaultThemeId() {
    return this.defaultTheme.id;
  }

  constructor() {}

  public findThemeById(id: string) {
    return this._themesEnumerable.singleOrDefault((t) => t.id === id);
  }

  public themeExists(id: string) {
    return this._themesEnumerable.any((t) => t.id === id);
  }

  public addTheme(theme: Theme) {
    theme.isDefaultAltTheme = false;
    theme.isDefaultTheme = false;
    theme.source = "theme-manager";
  }
  */
}
