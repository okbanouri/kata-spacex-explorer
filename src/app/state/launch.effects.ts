import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SpacexService } from '../services/spacex';
import * as LaunchActions from './launch.actions';

@Injectable()
export class LaunchEffects {
  private readonly actions$ = inject(Actions);
  private readonly spacexService = inject(SpacexService);

  loadOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => LaunchActions.loadLaunches())
    )
  );

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
