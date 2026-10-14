import { createAction, props } from '@ngrx/store';
import { Launch } from '../models/launch';

export const loadLaunches = createAction('[Launch List] Load Launches');
export const loadLaunchesSuccess = createAction('[Launch List] Load Success', props<{ launches: Launch[] }>());
export const loadLaunchesFailure = createAction('[Launch List] Load Failure', props<{ error: string }>());

export const toggleFavorite = createAction('[Launch] Toggle Favorite', props<{ flightNumber: number }>());
