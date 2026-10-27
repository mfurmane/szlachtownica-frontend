import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Place, Province, Region } from '../shared/map';

export interface MapSelection {
  region: Region;
  province: Province;
  place?: Place;
}

@Injectable({
  providedIn: 'root'
})
export class MapSelectionService {

  private readonly selectionSignal: WritableSignal<MapSelection | undefined> = signal<MapSelection | undefined>(undefined);
  readonly selection: Signal<MapSelection | undefined> = this.selectionSignal.asReadonly();

  private readonly hoveredSignal: WritableSignal<MapSelection | undefined> = signal<MapSelection | undefined>(undefined);
  readonly hovered: Signal<MapSelection | undefined> = this.hoveredSignal.asReadonly();

  setSelection(selection: MapSelection): void {
    this.selectionSignal.set(selection);
  }

  clearSelection(): void {
    this.selectionSignal.set(undefined);
  }

  setHovered(hovered: MapSelection): void {
    this.hoveredSignal.set(hovered);
  }

  clearHovered(): void {
    this.hoveredSignal.set(undefined);
  }

}
