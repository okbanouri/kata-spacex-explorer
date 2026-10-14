import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { loadLaunches, toggleFavorite } from '../../state/launch.actions';
import { selectError, selectFavoriteIdSet, selectIsLoading, selectLaunchesByFlightNumber } from '../../state/launch.selectors';

@Component({
  selector: 'app-launch-details',
  imports: [DatePipe, RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './launch-details.html',
  styleUrl: './launch-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {
  private readonly store = inject(Store);

  readonly id = input.required<string>();

  private readonly launchesByFlightNumber = this.store.selectSignal(selectLaunchesByFlightNumber);
  private readonly favoriteIds = this.store.selectSignal(selectFavoriteIdSet);
  readonly isLoading = this.store.selectSignal(selectIsLoading);
  readonly error = this.store.selectSignal(selectError);

  private readonly flightNumber = computed(() => Number(this.id()));
  readonly launch = computed(() => this.launchesByFlightNumber().get(this.flightNumber()));
  readonly isFavorite = computed(() => this.favoriteIds().has(this.flightNumber()));

  loadLaunches(): void {
    this.store.dispatch(loadLaunches());
  }

  toggleFavorite(): void {
    this.store.dispatch(toggleFavorite({ flightNumber: this.flightNumber() }));
  }
}
