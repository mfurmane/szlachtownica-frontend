import { Component, computed, inject, Signal } from '@angular/core';
import { WorldStateService } from '../../../services/world-state.service';
import { allRegions, Province, Region, toPath } from '../../../shared/map';
import { MapSelectionService } from '../../../services/map-selection.service';
import { ColoringService } from '../../../services/coloring.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'g[appRegionsLayer]',
  standalone: true,
  imports: [],
  templateUrl: './regions-layer.component.html',
  styleUrl: './regions-layer.component.scss'
})
export class RegionsLayerComponent {
  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly coloringService: ColoringService = inject(ColoringService);

  readonly provinces: Signal<Array<Province>> = toSignal(this.worldStateService.provinces$, { initialValue: [] });
  readonly paths: Signal<Map<number, string>> = computed(() => {
    const provinces: Array<Province> = this.provinces();
    return new Map(allRegions(provinces)
      .map((region: Region) => [region.id, toPath(region.area)]));
  });

  readonly colorFunction: Signal<(region: Region) => string> = this.coloringService.colorFunction;

  onRegionClick(region: Region, province: Province): void {
    this.selectionService.setSelection({ region, province });
  }

  onRegionEnter(region: Region, province: Province): void {
    this.selectionService.setHovered({ region, province });
  }

  onElementLeave(): void {
    this.selectionService.clearHovered();
  }
}
