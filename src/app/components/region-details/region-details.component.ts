import { Component, Input } from '@angular/core';
import { Climate, EnchantType, Humidity, Region, RegionType, SoilType, TerrainShape } from '../../dto/Map';
import { REGION_TYPE_LABELS, TERRAIN_SHAPE_LABELS, HUMIDITY_LABELS, CLIMATE_LABELS, ENCHANT_LABELS, SOIL_LABELS } from '../../shared/region-labels';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.scss'
})
export class RegionDetailsComponent {
  @Input({ required: true }) region!: Region;

  regionTypeLabels: Record<RegionType, string> = REGION_TYPE_LABELS;
  terrainShapeLabels: Record<TerrainShape, string> = TERRAIN_SHAPE_LABELS;
  humidityLabels: Record<Humidity, string> = HUMIDITY_LABELS;
  climateLabels: Record<Climate, string> = CLIMATE_LABELS;
  enchantLabels: Record<EnchantType, string> = ENCHANT_LABELS;
  soilLabels: Record<SoilType, string> = SOIL_LABELS;

}
