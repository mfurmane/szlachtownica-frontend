import { computed, inject, Injectable, Signal } from '@angular/core';
import { Characteristic, Region } from '../shared/map';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { LegendCategory, LegendRow, LEGENDS } from '../shared/legend';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterService } from './filter.service';
import _ from 'lodash';
import { FormControl, FormGroup, FormRecord } from '@angular/forms';
import { ColorRecord, Palette, PaletteForm } from '../shared/coloring';

@Injectable({
  providedIn: 'root'
})
export class ColoringService {
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

  readonly paletteForm: FormGroup<PaletteForm> =
    new FormGroup<PaletteForm>({
      [Characteristic.CLIMATE]: this.createColorRecord(LEGENDS[Characteristic.CLIMATE]),
      [Characteristic.HUMIDITY]: this.createColorRecord(LEGENDS[Characteristic.HUMIDITY]),
      [Characteristic.REGION_TYPE]: this.createColorRecord(LEGENDS[Characteristic.REGION_TYPE]),
      [Characteristic.TERRAIN_SHAPE]: this.createColorRecord(LEGENDS[Characteristic.TERRAIN_SHAPE]),
      [Characteristic.SOIL]: this.createColorRecord(LEGENDS[Characteristic.SOIL]),
      [Characteristic.ENCHANT]: this.createColorRecord(LEGENDS[Characteristic.ENCHANT])
    });

  readonly palette: Signal<Palette> = toSignal(
    this.paletteForm.valueChanges.pipe(
      map(() => this.paletteForm.getRawValue()),
      startWith(this.paletteForm.getRawValue())
    ),
    { requireSync: true }
  );

  readonly currentColoring: Signal<Characteristic> = toSignal(this.currentColoring$, { requireSync: true });
  readonly highlightedCategory: Signal<LegendRow | undefined> = toSignal(this.highlightedCategory$, { requireSync: true });
  readonly filtered: Signal<Array<Region>> = this.filterService.filtered;
  readonly colorFunction: Signal<(region: Region) => string> = computed(() => {
    const highlighted: LegendRow | undefined = this.highlightedCategory();
    const coloring: Characteristic = this.currentColoring();
    const filteredRegions: Set<Region> = new Set(this.filtered());
    const palette: Palette = this.palette();
    return (region: Region) => {
      let color: string;
      if (_.isNil(highlighted)) {
        color = palette[coloring][LEGENDS[coloring].valuePicker(region)];
      } else {
        color = highlighted.matches(region) ? this.highlightedColor : this.unhighlightedColor;
      }
      if (!filteredRegions.has(region)) {
        color = this.fadeRgbColor(color);
      }
      return color;
    }
  });

  private createColorRecord(category: LegendCategory): ColorRecord {
    const colors: ColorRecord = new FormRecord<FormControl<string>>({});
    category.rows.forEach((row: LegendRow) => {
      colors.addControl(row.value, new FormControl<string>(row.defaultColor, { nonNullable: true }));
    });
    return colors;
  }

}
