import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-size-change-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-change-events.component.html',
  styleUrls: ['./size-change-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeChangeEventsComponent {

}
