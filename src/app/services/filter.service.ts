import { computed, inject, Injectable, Signal } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { inRange, rangeCheck, RangeForm, RegionFilter, RegionFilterForm } from '../shared/filter';
import { RegionType, SoilType, TerrainShape, Climate, Humidity, EnchantType, Region, allRegions } from '../shared/map';
import _ from 'lodash';
import { startWith, map, filter } from 'rxjs';
import { WorldStateService } from './world-state.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly regions: Signal<Array<Region>> = toSignal(this.worldStateService.provinces$.pipe(map(allRegions)), { initialValue: [] });

  //new FormControl(undefined) daje null (domyślny parametr konstruktora)
  private createControl<T>(validators?: Array<ValidatorFn>): FormControl<T | undefined> {
    return new FormControl<T | undefined>({ value: undefined, disabled: false }, { validators: validators, nonNullable: true });
  }

  private createRangeControl(): FormGroup<RangeForm> {
    return new FormGroup<RangeForm>({
      from: this.createControl<number>([Validators.min(0)]),
      to: this.createControl<number>([Validators.min(0)])
    }, { validators: [rangeCheck] });
  }

  readonly regionFilterForm: FormGroup<RegionFilterForm> = new FormGroup<RegionFilterForm>({
    regionType: this.createControl<RegionType>(),
    soil: this.createControl<SoilType>(),
    terrainShape: this.createControl<TerrainShape>(),
    climate: this.createControl<Climate>(),
    humidity: this.createControl<Humidity>(),
    enchant: this.createControl<EnchantType>(),
    enchantmentLevel: this.createRangeControl(),
    fertility: this.createRangeControl()
  });

  private readonly filters: Signal<RegionFilter> = toSignal(
    this.regionFilterForm.valueChanges.pipe(
      filter(() => this.regionFilterForm.valid),
      startWith(this.regionFilterForm.getRawValue())
    ),
    { requireSync: true }
  );

  readonly filtered: Signal<Array<Region>> = computed((): Array<Region> => {
    const filters: RegionFilter = this.filters();
    const regions: Array<Region> = this.regions();
    return regions.filter((region: Region) => {
      return (_.isNil(filters.climate) || filters.climate === region.climate)
        && (_.isNil(filters.enchant) || filters.enchant === region.enchant)
        && (_.isNil(filters.humidity) || filters.humidity === region.humidity)
        && (_.isNil(filters.regionType) || filters.regionType === region.type)
        && (_.isNil(filters.terrainShape) || filters.terrainShape === region.terrainShape)
        && (_.isNil(filters.soil) || filters.soil === region.soilType)
        && inRange(region.fertility, filters.fertility)
        && inRange(region.enchantmentLevel, filters.enchantmentLevel);
    });
  });

  clear(): void {
    this.regionFilterForm.reset();
  }

}
