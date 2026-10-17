import { Component, inject } from '@angular/core';
import { allRegions, Characteristic, Climate, EnchantType, Humidity, Region, RegionType, SoilType, TerrainShape } from '../../../shared/map';
import { CHARACTERISTIC_LABELS, LegendCategory, LEGENDS } from '../../../shared/legend';
import { RegionFilter } from '../../../shared/coloring';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorldStateService } from '../../../services/world-state.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import _ from 'lodash';
import { AsyncPipe } from '@angular/common';

interface RegionFilterForm {
  regionType: FormControl<RegionType | undefined>;
  soil: FormControl<SoilType | undefined>;
  terrainShape: FormControl<TerrainShape | undefined>;
  climate: FormControl<Climate | undefined>;
  humidity: FormControl<Humidity | undefined>;
  enchant: FormControl<EnchantType | undefined>;
  enchantmentLevel: FormControl<number | undefined>;
  fertility: FormControl<number | undefined>;
}

@Component({
  selector: 'app-region-filter',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './region-filter.component.html',
  styleUrl: './region-filter.component.scss'
})
export class RegionFilterComponent {
  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly regions$: Observable<Array<Region>> = this.worldStateService.provinces$.pipe(map(allRegions));

  readonly characteristics: Array<Characteristic> = Object.values(Characteristic);
  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;
  readonly characteristicCategories: Record<Characteristic, LegendCategory> = LEGENDS;
  readonly controlNames: Record<Characteristic, keyof RegionFilterForm> = {
    [Characteristic.REGION_TYPE]: 'regionType',
    [Characteristic.TERRAIN_SHAPE]: 'terrainShape',
    [Characteristic.HUMIDITY]: 'humidity',
    [Characteristic.CLIMATE]: 'climate',
    [Characteristic.SOIL]: 'soil',
    [Characteristic.ENCHANT]: 'enchant'
  };

  //new FormControl(undefined) daje null (domyślny parametr konstruktora)
  private createControl<T>(): FormControl<T | undefined> {
    return new FormControl<T | undefined>({ value: undefined, disabled: false }, { nonNullable: true });
  }

  readonly regionFilterForm: FormGroup<RegionFilterForm> = new FormGroup<RegionFilterForm>({
    regionType: this.createControl<RegionType>(),
    soil: this.createControl<SoilType>(),
    terrainShape: this.createControl<TerrainShape>(),
    climate: this.createControl<Climate>(),
    humidity: this.createControl<Humidity>(),
    enchant: this.createControl<EnchantType>(),
    enchantmentLevel: this.createControl<number>(),
    fertility: this.createControl<number>()
  });

  private readonly filters$: Observable<RegionFilter> = this.regionFilterForm.valueChanges.pipe(startWith(this.regionFilterForm.getRawValue()));
  readonly filtered$: Observable<Array<Region>> = combineLatest([this.filters$, this.regions$]).pipe(
    map(([filters, regions]: [RegionFilter, Array<Region>]) => {
      return regions.filter((region: Region) => {
        return (_.isNil(filters.climate) || filters.climate === region.climate)
          && (_.isNil(filters.enchant) || filters.enchant === region.enchant)
          && (_.isNil(filters.humidity) || filters.humidity === region.humidity)
          && (_.isNil(filters.regionType) || filters.regionType === region.type)
          && (_.isNil(filters.terrainShape) || filters.terrainShape === region.terrainShape)
          && (_.isNil(filters.soil) || filters.soil === region.soilType);
      });
    })
  );

}
