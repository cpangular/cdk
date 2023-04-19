import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, OnInit, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ResizeDirective } from '@cpangular/cdk';
import { Size, elementSize } from '@cpangular/rxjs';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [CommonModule, ResizeDirective],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsSizePageComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _changeRef = inject(ChangeDetectorRef);

  @ViewChild('textarea', { static: true, read: ElementRef })
  private textarea?: ElementRef<HTMLTextAreaElement>;

  protected textAreaSize$?: Observable<Size>;
  protected asdf = true;

  protected directiveSize: Size = { width: 0, height: 0 };

  protected textAreaSizeSignal = signal<Size>({ width: 0, height: 0 });


  protected textAreaArea = computed(() => this.textAreaSizeSignal().width * this.textAreaSizeSignal().height);


  constructor() {
    effect(() => console.log('width', this.textAreaSizeSignal().width));
  }

  public ngOnInit() {
    this.textAreaSize$ = elementSize(this.textarea?.nativeElement).pipe(
      tap((size: Size) => setTimeout(() => this._changeRef.detectChanges())),
      tap((size: Size) => this.textAreaSizeSignal.set(size)),
      tap((size: Size) => console.log('size', size)),
      takeUntilDestroyed(this._destroyRef)
    );
    this.textAreaSize$.subscribe();
  }

}
