import { getDocument } from './getDocument';

export function documentElement(): Element | null {
  return getDocument()?.documentElement || null;
}
