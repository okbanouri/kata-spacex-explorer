import { Launch } from '../models/launch';

/** Case-insensitive match on mission name; an empty term returns all launches. */
export function filterLaunchesByName(launches: Launch[], term: string): Launch[] {
  const normalizedTerm = term.trim().toLowerCase();
  if (!normalizedTerm) {
    return launches;
  }
  return launches.filter(launch => launch.mission_name.toLowerCase().includes(normalizedTerm));
}
