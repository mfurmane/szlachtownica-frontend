import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Place, Province, Region } from '../shared/map';
import { Router } from '@angular/router';
import _ from 'lodash';

export interface MapSelection {
  region: Region;
  province: Province;
  place?: Place;
}

@Injectable({
  providedIn: 'root'
})
export class MapSelectionService {
  private readonly router: Router = inject(Router);

  private readonly selectionSignal: WritableSignal<MapSelection | undefined> = signal<MapSelection | undefined>(undefined);
  readonly selection: Signal<MapSelection | undefined> = this.selectionSignal.asReadonly();

  private readonly hoveredSignal: WritableSignal<MapSelection | undefined> = signal<MapSelection | undefined>(undefined);
  readonly hovered: Signal<MapSelection | undefined> = this.hoveredSignal.asReadonly();

  pathToSelection(selection: MapSelection | undefined): Array<string | number> {
    if (_.isNil(selection)) {
      return ['/details'];
    } else if (_.isNil(selection.place)) {
      return ['/details', 'region', selection.region.id];
    } else {
      return ['/details', 'place', selection.place.id];
    }
  }

  routeToSelection(selection: MapSelection): void {
    this.router.navigate(this.pathToSelection(selection));
  }

  setSelection(selection: MapSelection | undefined): void {
    this.selectionSignal.set(selection);
  }

  clearSelection(): void {
    this.selectionSignal.set(undefined);
    if (this.router.url.startsWith('/details/')) {
      this.router.navigate(this.pathToSelection(undefined));
    }
  }

  setHovered(hovered: MapSelection): void {
    this.hoveredSignal.set(hovered);
  }

  clearHovered(): void {
    this.hoveredSignal.set(undefined);
  }

}
