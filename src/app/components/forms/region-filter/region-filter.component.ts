import { Component, inject } from '@angular/core';
import { Characteristic, Region } from '../../../shared/map';
import { CHARACTERISTIC_LABELS, LegendCategory, LEGENDS } from '../../../shared/legend';
import { RegionFilterForm } from '../../../shared/filter';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { AsyncPipe } from '@angular/common';
import { FilterService } from '../../../services/filter.service';


@Component({
  selector: 'app-region-filter',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './region-filter.component.html',
  styleUrl: './region-filter.component.scss'
})
export class RegionFilterComponent {
  private readonly filterService: FilterService = inject(FilterService);

  readonly regionFilterForm: FormGroup<RegionFilterForm> = this.filterService.regionFilterForm;
  readonly filtered$: Observable<Array<Region>> = this.filterService.filtered$;

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

}
