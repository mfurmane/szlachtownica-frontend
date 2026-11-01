import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Province } from '../shared/map';
import { Observable, ReplaySubject, retry, throwError, timer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

export enum MapStatus {
  WAITING,
  ERROR,
  READY
}
export interface MapLoadState {
  status: MapStatus;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorldStateService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly provincesSubject: ReplaySubject<Array<Province>> = new ReplaySubject<Array<Province>>(1);

  readonly provinces$: Observable<Array<Province>> = this.provincesSubject.asObservable();
  private readonly loadStateSignal: WritableSignal<MapLoadState> = signal<MapLoadState>({ status: MapStatus.WAITING });
  readonly loadState: Signal<MapLoadState> = this.loadStateSignal.asReadonly();

  private readonly url: string = `${environment.apiUrl}/world/provinces/all`;

  constructor() {
    this.http.get<Array<Province>>(this.url)
      .pipe(
        retry({
          count: 5,
          delay: (error: HttpErrorResponse) => this.isWorthRetrying(error) ? timer(2000) : throwError(() => error),
        }),
      ).subscribe({
        next: (data: Array<Province>) => {
          this.provincesSubject.next(data);
          this.loadStateSignal.set({ status: MapStatus.READY });
        },
        error: (error: HttpErrorResponse) => {
          this.loadStateSignal.set({ status: MapStatus.ERROR, message: `Serwer nie odpowiada albo zgłosił błąd (${error.status})` });
        }
      });
  }

  private isWorthRetrying(error: HttpErrorResponse): boolean {
    return error.status === 0 || error.status >= 500;
  }
}
