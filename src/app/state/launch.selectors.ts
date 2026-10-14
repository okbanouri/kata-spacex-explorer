import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LaunchState } from './launch.reducer';

export const selectLaunchState = createFeatureSelector<LaunchState>('launch');

export const selectAllLaunches = createSelector(selectLaunchState, state => state.launches);
export const selectIsLoading = createSelector(selectLaunchState, state => state.loading);
export const selectError = createSelector(selectLaunchState, state => state.error);
export const selectFavoriteIds = createSelector(selectLaunchState, state => state.favoriteIds);

/** Launches indexed by flight number, rebuilt only when the launches change. */
export const selectLaunchesByFlightNumber = createSelector(
  selectAllLaunches,
  launches => new Map(launches.map(launch => [launch.flight_number, launch]))
);

/** Favorite flight numbers as a Set for O(1) lookups, rebuilt only when favorites change. */
export const selectFavoriteIdSet = createSelector(selectFavoriteIds, favoriteIds => new Set(favoriteIds));
