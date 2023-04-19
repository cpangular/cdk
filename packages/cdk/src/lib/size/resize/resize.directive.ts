import { Directive, ElementRef, Output, computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { elementSize } from '@cpangular/rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Directive({
  selector: '[sizeChange], [widthChange], [heightChange]',
  standalone: true,
  exportAs: 'resize',
})
export class ResizeDirective {
  private readonly _elm: HTMLElement = inject(ElementRef).nativeElement;

  /**
   * Emits the size of the element when it changes.
    *
    * @example
    * <div (sizeChange)="onSizeChange($event)">
    *   ...
    * </div>
   */
  @Output()
  public readonly sizeChange = elementSize(this._elm).pipe(
    takeUntilDestroyed()
  );

  /**
   * Emits the width of the element when it changes.
   *
   * @example
   * <div (widthChange)="onWidthChange($event)">
   *  ...
   * </div>
   */
  @Output()
  public readonly widthChange = this.sizeChange.pipe(
    map(size => size.width),
    distinctUntilChanged(),
    takeUntilDestroyed()
  );

  /**
   * Emits the height of the element when it changes.
   *
   * @example
   * <div (heightChange)="onHeightChange($event)">
   *  ...
   * </div>
   */
  @Output()
  public readonly heightChange = this.sizeChange.pipe(
    map(size => size.height),
    distinctUntilChanged(),
    takeUntilDestroyed()
  );

  /**
   * A signal that emits the size of the element when it changes.
  */
  public readonly size = toSignal(this.sizeChange, { initialValue: { width: this._elm.offsetWidth, height: this._elm.offsetHeight } });

  /**
   * A signal that emits the width of the element when it changes.
   */
  public readonly width = computed(() => this.size().width);

  /**
   * A signal that emits the height of the element when it changes.
   */
  public readonly height = computed(() => this.size().height);
}
