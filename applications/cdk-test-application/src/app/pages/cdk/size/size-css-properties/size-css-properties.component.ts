import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-size-css-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-css-properties.component.html',
  styleUrls: ['./size-css-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeCssPropertiesComponent {

}
