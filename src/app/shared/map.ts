import type { Point, Polygon } from 'geojson';

export interface Province {
  id: number;
  name: string;
  area: Polygon;
  subProvinces: Array<SubProvince>;
}

export interface SubProvince {
  id: number;
  area: Polygon;
  provinces: Province;
  regions: Array<Region>;
}

export interface Region {
  id: number;
  area: Polygon;
  places: Array<Place>;

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
}

export interface Place {
  id: number;
  location: Point;
  name: string;
  type: PlaceType;
  placeCharacteristics: Array<PlaceCharacteristic>;
}

export interface ExtendedPlace {
  place: Place;
  region: Region;
  province: Province;
}

export function allRegions(provinces: Array<Province>): Array<Region> {
  return provinces
    .flatMap((province: Province) => province.subProvinces)
    .flatMap((subprovince: SubProvince) => subprovince.regions);
}

export function allPlaces(provinces: Array<Province>): Array<ExtendedPlace> {
  return provinces
    .flatMap((province: Province) => province.subProvinces
      .flatMap((subprovince: SubProvince) => subprovince.regions
        .flatMap((region: Region) => region.places
          .map((place: Place) => ({ place, region, province })))));
}

export enum PlaceType {
  SETTLEMENT = 'SETTLEMENT',         // zwykła osada, point + range or area

  NOBLE_MANOR = 'NOBLE_MANOR',        // posiadłość ziemska, point + area

  NOBLE_RESIDENCE = 'NOBLE_RESIDENCE',    // siedziba szlachecka, point
  COURT = 'COURT',              // ośrodek władzy prowincji lub kraju, point
  MONASTERY = 'MONASTERY',          // klasztor / zakon, point
  FORTRESS = 'FORTRESS',           // fort, twierdza, point
  ENCHANT_CENTER = 'ENCHANT_CENTER', // miejsce o silnym znaczeniu magicznym, point

  LAKE = 'LAKE', // area
  RIVER = 'RIVER', //linestring
  ROAD = 'ROAD'
}

export enum PlaceCharacteristic {
    CAPITAL = 'CAPITAL',
    LOCAL_CAPITAL = 'LOCAL_CAPITAL',

    HUNTING = 'HUNTING',
    LUMBERING = 'LUMBERING',
    PLANTING = 'PLANTING',
    FARMING = 'FARMING',
    FISHING = 'FISHING',
    FORTIFIED = 'FORTIFIED',
    MILITARY = 'MILITARY',
    TRADING = 'TRADING',
    ARTISAN = 'ARTISAN',
    MINING = 'MINING',
    RESORT = 'RESORT',
    ENCHANTED = 'ENCHANTED',
    SEA_PORT = 'SEA_PORT',
    RIVER_PORT = 'RIVER_PORT',

    WILDERNESS_ENCHANT = 'WILDERNESS_ENCHANT'
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

