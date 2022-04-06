import { HeaderAnchors } from './components/header/HeaderAnchors';
import { MenuAnchors } from './components/menu-base/MenuAnchors';

export type SymbolMap = { [key: string]: symbol | SymbolMap };

export const ApplicationAnchors = {
  menuStart: MenuAnchors.menuStart,
  menuEnd: MenuAnchors.menuEnd,
  header: {
    start: HeaderAnchors.start,
    end: HeaderAnchors.end,
  },
};
