import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LaunchesListComponent } from './launches-list';
import { loadLaunches } from '../../state/launch.actions';
import { initialState } from '../../state/launch.reducer';
import { Launch } from '../../models/launch';

describe('LaunchesListComponent', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;
  let store: MockStore;

  const launches = [
    { flight_number: 1, mission_name: 'FalconSat', links: {} },
    { flight_number: 2, mission_name: 'Crew-1', links: {} }
  ] as Launch[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesListComponent],
      providers: [provideMockStore({ initialState: { launch: { ...initialState, launches } } })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    vi.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadLaunches on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadLaunches());
  });

  it('should expose launches from the store', () => {
    expect(component.filteredLaunches()).toEqual(launches);
  });

  it('should filter launches by the search term', () => {
    component.searchTerm.set('crew');

    expect(component.filteredLaunches().map(launch => launch.mission_name)).toEqual(['Crew-1']);
  });

  it('should show a spinner while loading', () => {
    store.setState({ launch: { ...initialState, loading: true } });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mat-spinner')).not.toBeNull();
  });

  it('should show the error and retry on click', () => {
    store.setState({ launch: { ...initialState, error: 'Server Error' } });
    fixture.detectChanges();

    const alert: HTMLElement = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert.textContent).toContain('Server Error');

    alert.querySelector('button')!.click();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
