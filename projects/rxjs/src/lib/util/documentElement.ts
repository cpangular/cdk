import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export function getDocument(): Document {
  if (typeof document !== 'undefined') {
    return document;
  }
  return inject(DOCUMENT);
}

export function documentElement(): Element | null {
  return getDocument()?.documentElement || null;
}
