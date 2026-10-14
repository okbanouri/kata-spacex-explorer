import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SpacexService } from '../services/spacex';
import * as LaunchActions from './launch.actions';

@Injectable()
export class LaunchEffects {
  private readonly actions$ = inject(Actions);
  private readonly spacexService = inject(SpacexService);

  loadLaunches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadLaunches),
      switchMap(() =>
        this.spacexService.getPastLaunches().pipe(
          map(launches => LaunchActions.loadLaunchesSuccess({ launches })),
          catchError((error: unknown) => of(LaunchActions.loadLaunchesFailure({ error: toErrorMessage(error) })))
        )
      )
    )
  );
}

function toErrorMessage(error: unknown): string {
  return error instanceof HttpErrorResponse ? error.message : 'Failed to load launches';
}
