import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';

import { LaunchEffects } from './launch.effects';
import * as LaunchActions from './launch.actions';
import { SpacexService } from '../services/spacex';
import { Launch } from '../models/launch';

describe('LaunchEffects', () => {
  let actions$: Observable<Action>;
  let effects: LaunchEffects;
  let spacexService: { getPastLaunches: ReturnType<typeof vi.fn> };

  const launches = [{ flight_number: 1, mission_name: 'FalconSat' }] as Launch[];

  beforeEach(() => {
    spacexService = { getPastLaunches: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        LaunchEffects,
        provideMockActions(() => actions$),
        { provide: SpacexService, useValue: spacexService }
      ]
    });

    effects = TestBed.inject(LaunchEffects);
  });

  it('should dispatch loadLaunchesSuccess with the fetched launches', async () => {
    spacexService.getPastLaunches.mockReturnValue(of(launches));
    actions$ = of(LaunchActions.loadLaunches());

    const action = await firstValueFrom(effects.loadLaunches$);

    expect(action).toEqual(LaunchActions.loadLaunchesSuccess({ launches }));
  });

  it('should dispatch loadLaunchesFailure when the request fails', async () => {
    const error = new HttpErrorResponse({ status: 500, statusText: 'Server Error', url: 'launches.json' });
    spacexService.getPastLaunches.mockReturnValue(throwError(() => error));
    actions$ = of(LaunchActions.loadLaunches());

    const action = await firstValueFrom(effects.loadLaunches$);

    expect(action).toEqual(LaunchActions.loadLaunchesFailure({ error: error.message }));
  });
});
