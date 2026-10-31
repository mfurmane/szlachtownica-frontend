import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { allRegions, Characteristic, Province, Region } from '../../shared/map';
import { ColoringService } from '../../services/coloring.service';
import { LegendCategory, LegendRow, LEGENDS } from '../../shared/legend';
import { WorldStateService } from '../../services/world-state.service';
import { Palette } from '../../shared/coloring';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss'
})
export class LegendComponent {

  private readonly coloringService: ColoringService = inject(ColoringService);
  private readonly worldStateService: WorldStateService = inject(WorldStateService);

  readonly palette: Signal<Palette> = this.coloringService.palette;
  readonly currentColoring: Signal<Characteristic> = this.coloringService.currentColoring;
  readonly highlightedCategory: Signal<LegendRow | undefined> = this.coloringService.highlightedCategory;
  private readonly provinces: Signal<Array<Province>> = toSignal(this.worldStateService.provinces$, {initialValue: []});
  readonly legend: Signal<LegendCategory> = computed((): LegendCategory => LEGENDS[this.currentColoring()]);
  readonly regionCounts: Signal<Map<LegendRow, number>> = computed((): Map<LegendRow, number> => {
    const regions: Array<Region> = allRegions(this.provinces());
    return this.countRegions(regions);
  });

  collapsed: boolean = false;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  highlightCategory(row: LegendRow): void {
    this.coloringService.highlightCategory(row);
  }

  private countRegions(regions: Array<Region>): Map<LegendRow, number> {
    const regionCounts: Map<LegendRow, number> = new Map<LegendRow, number>();
    Object.values(Characteristic)
      .flatMap((characteristic: Characteristic) => LEGENDS[characteristic].rows)
      .forEach((row: LegendRow) => {
        regionCounts.set(row, regions.filter((region: Region) => row.matches(region)).length);
      });
    return regionCounts;
  }

}
