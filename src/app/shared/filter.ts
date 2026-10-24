import _ from "lodash";
import { Climate, EnchantType, Humidity, RegionType, SoilType, TerrainShape } from "./map";
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export interface RangeForm {
  from: FormControl<number | undefined>;
  to: FormControl<number | undefined>;
}

export interface NumberRange {
  from?: number;
  to?: number;
}

export interface RegionFilter {
  regionType?: RegionType;
  soil?: SoilType;
  terrainShape?: TerrainShape;
  climate?: Climate;
  humidity?: Humidity;
  enchant?: EnchantType;
  enchantmentLevel?: NumberRange;
  fertility?: NumberRange;
}

export interface RegionFilterForm {
  regionType: FormControl<RegionType | undefined>;
  soil: FormControl<SoilType | undefined>;
  terrainShape: FormControl<TerrainShape | undefined>;
  climate: FormControl<Climate | undefined>;
  humidity: FormControl<Humidity | undefined>;
  enchant: FormControl<EnchantType | undefined>;
  enchantmentLevel: FormGroup<RangeForm>;
  fertility: FormGroup<RangeForm>;
}

export interface RegionFilterFormRanges {
  name: keyof RegionFilterForm;
  label: string;
  step: number
}

export function rangeCheck(group: AbstractControl): ValidationErrors | null {
  const range: NumberRange = group.value;
  if (!_.isNil(range.from) && !_.isNil(range.to) && range.from > range.to) {
    return { rangeCorruption: true };
  }
  return null;
}

export function inRange(value: number, range?: NumberRange): boolean {
  return (_.isNil(range?.from) || range.from <= value)
        && (_.isNil(range?.to) || range.to >= value);
}
