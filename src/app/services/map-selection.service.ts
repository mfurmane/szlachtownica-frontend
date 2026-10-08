import { Injectable } from '@angular/core';
import { Province, Region } from '../dto/Map';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MapSelection {
  region: Region;
  province: Province;
}

@Injectable({
  providedIn: 'root'
})
export class MapSelectionService {

  private readonly selectionSubject: BehaviorSubject<MapSelection | undefined> = new BehaviorSubject<MapSelection | undefined>(undefined);
  readonly selection$: Observable<MapSelection | undefined> = this.selectionSubject.asObservable();

  setSelection(selection: MapSelection): void {
    this.selectionSubject.next(selection);
  }

}
