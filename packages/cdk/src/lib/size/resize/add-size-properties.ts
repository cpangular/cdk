import { Directive, ElementRef, Input, OnDestroy, inject } from '@angular/core';
import { elementSize } from '@cpangular/rxjs';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[addSizeProperties]',
  standalone: true,
  exportAs: 'addSizeProperties'
})
export class AddSizePropertiesDirective implements OnDestroy {
  private _ofElements: { [key: string]: HTMLElement | true; } | undefined;
  private _subscriptions: Subscription = new Subscription();

  private readonly _elm: HTMLElement = inject(ElementRef).nativeElement;

  @Input('addSizeProperties')
  public get ofElements(): { [key: string]: HTMLElement | true; } | undefined {
    return this._ofElements;
  }
  public set ofElements(value: { [key: string]: HTMLElement | true; } | undefined) {
    this._removeSizeProperties();
    this._ofElements = value;
    this._addSizeProperties();
  }

  private _removeSizeProperties(): void {
    this._subscriptions.unsubscribe();
    if (this.ofElements) {
      for (const key in this.ofElements) {
        if (key === 'self' && this.ofElements[key] === true) {
          this._elm.style.removeProperty('--width');
          this._elm.style.removeProperty('--height');
        } else {
          this._elm.style.removeProperty(`--${key}-width`);
          this._elm.style.removeProperty(`--${key}-height`);
        }
      }
    } else {
      this._elm.style.removeProperty('--width');
      this._elm.style.removeProperty('--height');
    }
  }

  private _addSizeProperties(): void {
    this._subscriptions = new Subscription();
    const ofElements = this.ofElements ?? { self: true };
    for (const key in ofElements) {
      const elm = ofElements[key];
      this._subscriptions.add(elementSize(elm === true ? this._elm : elm).subscribe(size => {
        if (key === 'self' && elm === true) {
          this._elm.style.setProperty('--width', `${size.width}px`);
          this._elm.style.setProperty('--height', `${size.height}px`);
        } else {
          this._elm.style.setProperty(`--${key}-width`, `${size.width}px`);
          this._elm.style.setProperty(`--${key}-height`, `${size.height}px`);
        }
      }));
    }
  }

  public ngOnDestroy(): void {
    this._removeSizeProperties();
  }

}


