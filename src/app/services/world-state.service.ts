import { inject, Injectable } from '@angular/core';
import { Province } from '../shared/map';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorldStateService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly provincesSubject: ReplaySubject<Province[]> = new ReplaySubject<Province[]>(1);
  readonly provinces$: Observable<Province[]> = this.provincesSubject.asObservable();

  constructor() {
    this.http.get<Province[]>('http://localhost:8080/world/provinces/all')
      .subscribe((data: Province[]) => {
        this.provincesSubject.next(data);
      });
  }

}
