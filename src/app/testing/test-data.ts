import { Climate, EnchantType, Humidity, Place, PlaceType, Province, Region, RegionType, SoilType, TerrainShape } from '../shared/map';

export function createRegion(overrides: Partial<Region> = {}): Region {
  return {
    id: 1,
    area: { type: 'Polygon', coordinates: [] },
    places: [],

    humidity: Humidity.NEUTRAL,
    climate: Climate.NEUTRAL,
    terrainShape: TerrainShape.FLATLANDS,
    soilType: SoilType.FERTILE,
    type: RegionType.FOREST,
    enchant: EnchantType.NONE,
    fertility: 0,
    efficiency: 0,
    plantingEasiness: 0,
    farmingEasiness: 0,
    health: 0,
    windOfChange: 0,
    expansion: 0,
    attitude: 0,
    stability: 0,
    woodRichness: 0,
    developmentLevel: 0,
    enchantmentLevel: 0,
    ...overrides,
  };
}

export function createPlace(overrides: Partial<Place> = {}): Place {
  return {
    id: 1,
    name: '',
    placeCharacteristics: [],
    location: { type: 'Point', coordinates: [0, 0] },
    type: PlaceType.SETTLEMENT,
    ...overrides,
  };
}

export function createProvince(overrides: Partial<Province> = {}): Province {
  return {
    id: 1,
    name: '',
    area: { type: 'Polygon', coordinates: [] },
    subProvinces: [],
    ...overrides,
  };
}
