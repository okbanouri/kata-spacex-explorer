import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { loadLaunches, toggleFavorite } from '../../state/launch.actions';
import { selectAllLaunches, selectError, selectFavoriteIdSet, selectIsLoading } from '../../state/launch.selectors';
import { filterLaunchesByName } from '../../utils/filter-launches';
import { LaunchCardComponent } from '../launch-card/launch-card';


@Component({
  selector: 'app-launches-list',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, LaunchCardComponent],
  templateUrl: './launches-list.html',
  styleUrl: './launches-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchesListComponent {
  private readonly store = inject(Store);

  private readonly launches = this.store.selectSignal(selectAllLaunches);
  readonly isLoading = this.store.selectSignal(selectIsLoading);
  readonly error = this.store.selectSignal(selectError);
  readonly favoriteIds = this.store.selectSignal(selectFavoriteIdSet);
  readonly searchTerm = signal('');
  readonly filteredLaunches = computed(() => filterLaunchesByName(this.launches(), this.searchTerm()));

  loadLaunches(): void {
    this.store.dispatch(loadLaunches());
  }

  toggleFavorite(flightNumber: number): void {
    this.store.dispatch(toggleFavorite({ flightNumber }));
  }
}
