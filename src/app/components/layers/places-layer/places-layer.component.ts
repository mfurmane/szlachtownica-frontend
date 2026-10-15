import { Component, computed, inject, Signal } from '@angular/core';
import { allPlaces, ExtendedPlace, Province } from '../../../shared/map';
import { MapSelectionService } from '../../../services/map-selection.service';
import { WorldStateService } from '../../../services/world-state.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'g[appPlacesLayer]',
  standalone: true,
  imports: [],
  templateUrl: './places-layer.component.html',
  styleUrl: './places-layer.component.scss'
})
export class PlacesLayerComponent {
  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);

  private readonly provinces: Signal<Array<Province>> = toSignal(this.worldStateService.provinces$, { initialValue: [] });
  readonly places: Signal<Array<ExtendedPlace>> = computed(() => allPlaces(this.provinces()));

  onPlaceClick(extendedPlace: ExtendedPlace): void {
    this.selectionService.setSelection(extendedPlace);
  }

  onPlaceEnter(extendedPlace: ExtendedPlace): void {
    this.selectionService.setHovered(extendedPlace);
  }

  onElementLeave(): void {
    this.selectionService.clearHovered();
  }
}
