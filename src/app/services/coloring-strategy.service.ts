import { computed, inject, Injectable, Signal } from '@angular/core';
import { Characteristic, Region } from '../shared/map';
import { BehaviorSubject, Observable } from 'rxjs';
import { LegendRow, LEGENDS } from '../shared/legend';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterService } from './filter.service';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ColoringStrategyService {
  private readonly filterService: FilterService = inject(FilterService);

  private readonly currentColoringSubject: BehaviorSubject<Characteristic> = new BehaviorSubject<Characteristic>(Characteristic.REGION_TYPE);
  readonly currentColoring$: Observable<Characteristic> = this.currentColoringSubject.asObservable();

  private readonly highlightedCategorySubject: BehaviorSubject<LegendRow | undefined> = new BehaviorSubject<LegendRow | undefined>(undefined);
  readonly highlightedCategory$: Observable<LegendRow | undefined> = this.highlightedCategorySubject.asObservable();

  private readonly highlightedColor: string = '#ffff00';
  private readonly unhighlightedColor: string = '#292918';

  private fadeRgbColor(color: string): string {
    return color + '40';
  }

  setCurrentColoring(currentColoring: Characteristic): void {
    this.currentColoringSubject.next(currentColoring);
    this.highlightedCategorySubject.next(undefined);
  }

  highlightCategory(row: LegendRow): void {
    if (this.highlightedCategorySubject.value !== row) {
      this.highlightedCategorySubject.next(row);
    } else {
      this.highlightedCategorySubject.next(undefined);
    }
  }

  showCategory(characteristic: Characteristic, row: LegendRow): void {
    this.setCurrentColoring(characteristic);
    this.highlightCategory(row);
  }

  readonly currentColoring: Signal<Characteristic> = toSignal(this.currentColoring$, { requireSync: true });
  readonly highlightedCategory: Signal<LegendRow | undefined> = toSignal(this.highlightedCategory$, { requireSync: true });
  readonly filtered: Signal<Array<Region>> = toSignal(this.filterService.filtered$, { initialValue: [] });
  readonly colorFunction: Signal<(region: Region) => string> = computed(() => {
    const highlighted: LegendRow | undefined = this.highlightedCategory();
    const coloring: Characteristic = this.currentColoring();
    const filteredRegions: Set<Region> = new Set(this.filtered());
    return (region: Region) => {
      let color: string;
      if (_.isNil(highlighted)) {
        color = LEGENDS[coloring].colorPicker(region);
      } else {
        color = highlighted.matches(region) ? this.highlightedColor : this.unhighlightedColor;
      }
      if (!filteredRegions.has(region)) {
        color = this.fadeRgbColor(color);
      }
      return color;
    }
  });

}
