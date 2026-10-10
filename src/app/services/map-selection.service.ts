import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Province, Region } from '../shared/map';

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

  private readonly hoveredSubject: BehaviorSubject<MapSelection | undefined> = new BehaviorSubject<MapSelection | undefined>(undefined);
  readonly hovered$: Observable<MapSelection | undefined> = this.hoveredSubject.asObservable();

  setSelection(selection: MapSelection): void {
    this.selectionSubject.next(selection);
  }

  clearSelection(): void {
    this.selectionSubject.next(undefined);
  }

  setHovered(hovered: MapSelection): void {
    this.hoveredSubject.next(hovered);
  }

  clearHovered(): void {
    this.hoveredSubject.next(undefined);
  }

}
