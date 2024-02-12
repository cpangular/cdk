export function documentElement(): Element | null {
  return typeof document === undefined ? null : document.documentElement;
}
