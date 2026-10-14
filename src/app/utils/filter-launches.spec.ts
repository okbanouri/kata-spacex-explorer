import { filterLaunchesByName } from './filter-launches';
import { Launch } from '../models/launch';

describe('filterLaunchesByName', () => {
  const launches = [
    { flight_number: 1, mission_name: 'FalconSat' },
    { flight_number: 2, mission_name: 'Crew-1' }
  ] as Launch[];

  it('should return all launches for an empty or blank term', () => {
    expect(filterLaunchesByName(launches, '')).toBe(launches);
    expect(filterLaunchesByName(launches, '   ')).toBe(launches);
  });

  it('should match mission names ignoring case and surrounding spaces', () => {
    expect(filterLaunchesByName(launches, ' crew ')).toEqual([launches[1]]);
  });

  it('should return an empty list when nothing matches', () => {
    expect(filterLaunchesByName(launches, 'starship')).toEqual([]);
  });
});
