import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeComponent {

}
