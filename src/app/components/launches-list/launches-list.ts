import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { loadLaunches } from '../../state/launch.actions';
import { selectAllLaunches } from '../../state/launch.selectors';
import { filterLaunchesByName } from '../../utils/filter-launches';


@Component({
  selector: 'app-launches-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatChipsModule, MatButtonModule],
  templateUrl: './launches-list.html',
  styleUrl: './launches-list.scss'
})
export class LaunchesListComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly launches = this.store.selectSignal(selectAllLaunches);
  readonly searchTerm = signal('');
  readonly filteredLaunches = computed(() => filterLaunchesByName(this.launches(), this.searchTerm()));

  ngOnInit(): void {
    this.store.dispatch(loadLaunches());
  }
}
