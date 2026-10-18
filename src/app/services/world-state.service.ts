import { inject, Injectable } from '@angular/core';
import { Province } from '../shared/map';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorldStateService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly provincesSubject: ReplaySubject<Array<Province>> = new ReplaySubject<Array<Province>>(1);

  readonly provinces$: Observable<Array<Province>> = this.provincesSubject.asObservable();
  // private url: string = 'http://localhost:8080/world/provinces/all';
  private url: string = 'assets/offline.json';

  constructor() {
    this.http.get<Array<Province>>(this.url)
      .subscribe((data: Array<Province>) => {
        this.provincesSubject.next(data);
      });
  }

}
