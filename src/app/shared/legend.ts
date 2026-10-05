import { CLIMATE_COLORS, ENCHANT_COLORS, HUMIDITY_COLORS, REGION_TYPE_COLORS, SOIL_COLORS, TERRAIN_SHAPE_COLORS } from "./region-colors";
import { CLIMATE_LABELS, ENCHANT_LABELS, HUMIDITY_LABELS, REGION_TYPE_LABELS, SOIL_LABELS, TERRAIN_SHAPE_LABELS } from "./region-labels";
import { Characteristic, Climate, EnchantType, Humidity, Region, RegionType, SoilType, TerrainShape } from "../dto/Map";

export const CHARACTERISTIC_LABELS: Record<Characteristic, string> = {
  [Characteristic.REGION_TYPE]: 'Typ regionu',
  [Characteristic.TERRAIN_SHAPE]: 'Kształt terenu',
  [Characteristic.HUMIDITY]: 'Wilgotność',
  [Characteristic.CLIMATE]: 'Klimat',
  [Characteristic.SOIL]: 'Gleba',
  [Characteristic.ENCHANT]: 'Magiczny wpływ'
};

export interface LegendRow {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly matches: (region: Region) => boolean;
}

export interface LegendCategory {
  readonly rows: readonly LegendRow[];
  readonly valuePicker: (region: Region) => string;
  readonly colorPicker: (region: Region) => string;
}

function buildCategory<T extends string>(
  values: T[],
  labels: Record<T, string>,
  colors: Record<T, string>,
  picker: (region: Region) => T
): LegendCategory {
  return {
    rows: values.map(value => ({
      value,
      label: labels[value],
      color: colors[value],
      matches: (region: Region) => picker(region) === value
    })),
    valuePicker: picker,
    colorPicker: (region: Region) => colors[picker(region)]
  };
}

export const LEGENDS: Record<Characteristic, LegendCategory> = {
  [Characteristic.REGION_TYPE]:  buildCategory(Object.values(RegionType), REGION_TYPE_LABELS, REGION_TYPE_COLORS, (region: Region) => region.type),
  [Characteristic.CLIMATE]:  buildCategory(Object.values(Climate), CLIMATE_LABELS, CLIMATE_COLORS, (region: Region) => region.climate),
  [Characteristic.HUMIDITY]:  buildCategory(Object.values(Humidity), HUMIDITY_LABELS, HUMIDITY_COLORS, (region: Region) => region.humidity),
  [Characteristic.SOIL]:  buildCategory(Object.values(SoilType), SOIL_LABELS, SOIL_COLORS, (region: Region) => region.soilType),
  [Characteristic.TERRAIN_SHAPE]:  buildCategory(Object.values(TerrainShape), TERRAIN_SHAPE_LABELS, TERRAIN_SHAPE_COLORS, (region: Region) => region.terrainShape),
  [Characteristic.ENCHANT]:  buildCategory(Object.values(EnchantType), ENCHANT_LABELS, ENCHANT_COLORS, (region: Region) => region.enchant)
};
