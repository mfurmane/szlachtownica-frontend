import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { allRegions, Characteristic, Province, Region } from '../../shared/map';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { LegendCategory, LegendRow, LEGENDS } from '../../shared/legend';
import { WorldStateService } from '../../services/world-state.service';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss'
})
export class LegendComponent implements OnInit {

  private readonly coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);
  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  currentColoring: Characteristic = Characteristic.REGION_TYPE;
  highlighted?: LegendRow;
  regionCounts: Map<LegendRow, number> = new Map<LegendRow, number>();
  collapsed: boolean = false;

  ngOnInit(): void {
    this.coloringStrategyService.currentColoring$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currentColoring: Characteristic) => {
      this.currentColoring = currentColoring;
    });
    this.coloringStrategyService.highlightedCategory$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((highlighted: LegendRow | undefined) => {
      this.highlighted = highlighted;
    });
    this.worldStateService.provinces$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((provinces: Array<Province>) => {
        const regions: Array<Region> = allRegions(provinces);
        this.regionCounts = this.countRegions(regions);
      });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  getLegend(): LegendCategory {
    return LEGENDS[this.currentColoring];
  }

  highlightCategory(row: LegendRow): void {
    this.coloringStrategyService.highlightCategory(row);
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
