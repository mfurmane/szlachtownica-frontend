import type { Polygon } from 'geojson';

export interface Province {
  id: number;
  name: string;
  area: Polygon;
  subProvinces: SubProvince[];
}

export interface SubProvince {
  id: number;
  area: Polygon;
  provinces: Province;
  regions: Region[];
}

export interface Region {
  id: number;
  area: Polygon;

  humidity: Humidity;
  climate: Climate;
  terrainShape: TerrainShape;
  soilType: SoilType;
  type: RegionType;
  enchant: EnchantType;
  fertility: number;
  efficiency: number;
  plantingEasiness: number;
  farmingEasiness: number;
  health: number;
  windOfChange: number;
  expansion: number;
  attitude: number;
  stability: number;
  woodRichness: number;
  developmentLevel: number;
  enchantmentLevel: number;
  // coast: boolean;
}

export enum Characteristic {
  REGION_TYPE = 'REGION_TYPE',
  TERRAIN_SHAPE = 'TERRAIN_SHAPE',
  HUMIDITY = 'HUMIDITY',
  CLIMATE = 'CLIMATE',
  SOIL = 'SOIL',
  ENCHANT = 'ENCHANT'
}

export enum RegionType {
  FOREST = 'FOREST',
  SWAMP = 'SWAMP',
  DUST_PLAIN = 'DUST_PLAIN',
  ROCK_LAND = 'ROCK_LAND',
  PINE_CRAG = 'PINE_CRAG',
  MEADOWS = 'MEADOWS',
  FARMING_LAND = 'FARMING_LAND',
  SETTLERS_REACH = 'SETTLERS_REACH',
  TOURISTIC_LAND = 'TOURISTIC_LAND',
  ESTATE_REGION = 'ESTATE_REGION',
  CRAFTS_LAND = 'CRAFTS_LAND',
  ABANDONED_REACH = 'ABANDONED_REACH',
  IRON_MARCHES = 'IRON_MARCHES',
  SUPERNATURAL_EXPANSE = 'SUPERNATURAL_EXPANSE'
}

export enum TerrainShape {
  FLATLANDS = 'FLATLANDS',
  HIGHLANDS = 'HIGHLANDS',
  HILLS = 'HILLS',
  MOUNTAINS = 'MOUNTAINS',
  VALLEY = 'VALLEY',
  CANYONS = 'CANYONS',
  WETBASIN = 'WETBASIN',
  PLATEAUS = 'PLATEAUS',
  BADLANDS = 'BADLANDS'
}

export enum Humidity {
  EXTRA_DRY = 'EXTRA_DRY',
  DRY = 'DRY',
  NEUTRAL = 'NEUTRAL',
  WET = 'WET',
  EXTRA_WET = 'EXTRA_WET'
}

export enum Climate {
  VERY_COLD = 'VERY_COLD',
  COLD = 'COLD',
  NEUTRAL = 'NEUTRAL',
  WARM = 'WARM',
  HOT = 'HOT'
}

export enum SoilType {
  PEAT = 'PEAT',
  BARE_CRAG = 'BARE_CRAG',
  FERTILE = 'FERTILE',
  SALINE = 'SALINE',
  ASHEN = 'ASHEN',
  BASALTIC = 'BASALTIC',
  HUMUS_RICH = 'HUMUS_RICH',
  CHALKY = 'CHALKY',
  ROCKY = 'ROCKY',
  HARDPAN = 'HARDPAN',
  GRAVELLY = 'GRAVELLY',
  ALLUVIAL = 'ALLUVIAL',
  SHALE_TERRAIN = 'SHALE_TERRAIN',
  VOLCANIC = 'VOLCANIC',
  PERMAFROST = 'PERMAFROST',
  ACIDIC = 'ACIDIC',
  BLACK = 'BLACK',
  LOESS = 'LOESS',
  SANDY = 'SANDY',
  CLAY = 'CLAY',
  LIMESTONE = 'LIMESTONE',
  LOAMY = 'LOAMY',
  TANGLED = 'TANGLED'
}

export enum EnchantType {
  NONE = 'NONE',
  NERENETH = 'NERENETH',
  GHALAGAAR = 'GHALAGAAR',
  VOID = 'VOID',
  CAITHALOON = 'CAITHALOON',
  TAELIA = 'TAELIA',
  LIMBO = 'LIMBO',
  ABYSS = 'ABYSS',
  VEIL = 'VEIL',
  CORELLIA = 'CORELLIA'
}

