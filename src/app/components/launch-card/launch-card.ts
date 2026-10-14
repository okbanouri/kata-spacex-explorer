import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { Launch } from '../../models/launch';

@Component({
  selector: 'app-launch-card',
  imports: [DatePipe, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './launch-card.html',
  styleUrl: './launch-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchCardComponent {
  readonly launch = input.required<Launch>();
  readonly isFavorite = input(false);
  readonly favoriteToggled = output<void>();
}
