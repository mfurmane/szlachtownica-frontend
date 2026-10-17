import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegionFilter, RegionFilterForm } from '../shared/filter';
import { RegionType, SoilType, TerrainShape, Climate, Humidity, EnchantType, Region, allRegions } from '../shared/map';
import _ from 'lodash';
import { Observable, startWith, combineLatest, map, shareReplay } from 'rxjs';
import { WorldStateService } from './world-state.service';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly regions$: Observable<Array<Region>> = this.worldStateService.provinces$.pipe(map(allRegions));

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
    }),
    shareReplay(1)
  );

  clear(): void {
    this.regionFilterForm.reset();
  }

}
