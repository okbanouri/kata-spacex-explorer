import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Launch } from '../models/launch';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private readonly http = inject(HttpClient);
  private readonly localUrl = 'launches.json';

  getPastLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.localUrl);
  }

  getLaunchByFlightNumber(flightNumber: number): Observable<Launch | undefined> {
    return this.getPastLaunches().pipe(
      map(launches => launches.find(launch => launch.flight_number === flightNumber))
    );
  }
}
