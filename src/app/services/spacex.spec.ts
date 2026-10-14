import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { SpacexService } from './spacex';
import { Launch } from '../models/launch';

describe('SpacexService', () => {
  let service: SpacexService;
  let httpTesting: HttpTestingController;

  const launches = [
    { flight_number: 1, mission_name: 'FalconSat' },
    { flight_number: 2, mission_name: 'DemoSat' }
  ] as Launch[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(SpacexService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch past launches', () => {
    let result: Launch[] | undefined;
    service.getPastLaunches().subscribe(data => (result = data));

    httpTesting.expectOne('launches.json').flush(launches);

    expect(result).toEqual(launches);
  });

  it('should find a launch by flight number', () => {
    let result: Launch | undefined;
    service.getLaunchByFlightNumber(2).subscribe(data => (result = data));

    httpTesting.expectOne('launches.json').flush(launches);

    expect(result?.mission_name).toBe('DemoSat');
  });

  it('should return undefined for an unknown flight number', () => {
    let result: Launch | undefined = launches[0];
    service.getLaunchByFlightNumber(999).subscribe(data => (result = data));

    httpTesting.expectOne('launches.json').flush(launches);

    expect(result).toBeUndefined();
  });
});
