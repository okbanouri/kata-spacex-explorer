import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { LaunchesListComponent } from './launches-list';
import { Launch } from '../../models/launch';

describe('LaunchesListComponent', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;
  let httpTesting: HttpTestingController;

  const launches = [
    { flight_number: 1, mission_name: 'FalconSat', links: {} },
    { flight_number: 2, mission_name: 'Crew-1', links: {} }
  ] as Launch[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    httpTesting.expectOne('launches.json').flush(launches);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load launches on init', () => {
    expect(component.filteredLaunches).toEqual(launches);
  });

  it('should filter launches by mission name, ignoring case', () => {
    component.searchTerm = 'crew';
    component.onSearchChange();

    expect(component.filteredLaunches.map(launch => launch.mission_name)).toEqual(['Crew-1']);
  });
});
