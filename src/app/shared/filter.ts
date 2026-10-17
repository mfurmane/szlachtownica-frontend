import { Climate, EnchantType, Humidity, RegionType, SoilType, TerrainShape } from "./map";
import { FormControl } from "@angular/forms";

export interface RegionFilter {
  regionType?: RegionType;
  soil?: SoilType;
  terrainShape?: TerrainShape;
  climate?: Climate;
  humidity?: Humidity;
  enchant?: EnchantType;
  enchantmentLevel?: number;
  fertility?: number;
}

export interface RegionFilterForm {
  regionType: FormControl<RegionType | undefined>;
  soil: FormControl<SoilType | undefined>;
  terrainShape: FormControl<TerrainShape | undefined>;
  climate: FormControl<Climate | undefined>;
  humidity: FormControl<Humidity | undefined>;
  enchant: FormControl<EnchantType | undefined>;
  enchantmentLevel: FormControl<number | undefined>;
  fertility: FormControl<number | undefined>;
}
