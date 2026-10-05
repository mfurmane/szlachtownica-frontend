import { Climate, EnchantType, Humidity, RegionType, SoilType, TerrainShape } from "../dto/Map";

  export const REGION_TYPE_COLORS: Record<RegionType, string> = {
    [RegionType.ABANDONED_REACH]: '#000000',
    [RegionType.CRAFTS_LAND]: '#993800',
    [RegionType.DUST_PLAIN]: '#e3e2b9',
    [RegionType.ESTATE_REGION]: '#880000',
    [RegionType.FARMING_LAND]: '#fffb00',
    [RegionType.FOREST]: '#197f00',
    [RegionType.IRON_MARCHES]: '#2a2a2a',
    [RegionType.MEADOWS]: '#00ff37',
    [RegionType.PINE_CRAG]: '#61ffc8',
    [RegionType.ROCK_LAND]: '#a1a1a1',
    [RegionType.SETTLERS_REACH]: '#ff871e',
    [RegionType.SUPERNATURAL_EXPANSE]: '#ff00d9',
    [RegionType.SWAMP]: '#1b2e00',
    [RegionType.TOURISTIC_LAND]: '#606eff'
  };

  // Jak na mapie hipsometrycznej: niziny zielone, wyżej żółcie i brązy, góry szare
  export const TERRAIN_SHAPE_COLORS: Record<TerrainShape, string> = {
    [TerrainShape.BADLANDS]: '#8e6c8a',
    [TerrainShape.CANYONS]: '#c4472b',
    [TerrainShape.FLATLANDS]: '#a6d96a',
    [TerrainShape.HIGHLANDS]: '#a66a2e',
    [TerrainShape.HILLS]: '#d9a441',
    [TerrainShape.MOUNTAINS]: '#707070',
    [TerrainShape.PLATEAUS]: '#e6d27a',
    [TerrainShape.VALLEY]: '#4daf4a',
    [TerrainShape.WETBASIN]: '#2b8c7e'
  };

  // Skala rozbieżna: sucho (brąz) - neutralnie (szary) - mokro (morski), ColorBrewer BrBG
  export const HUMIDITY_COLORS: Record<Humidity, string> = {
    [Humidity.DRY]: '#dfc27d',
    [Humidity.EXTRA_DRY]: '#a6611a',
    [Humidity.EXTRA_WET]: '#018571',
    [Humidity.NEUTRAL]: '#f5f5f5',
    [Humidity.WET]: '#80cdc1'
  };

  // Skala rozbieżna: zimno (niebieski) - neutralnie (szary) - gorąco (czerwony), ColorBrewer RdBu
  export const CLIMATE_COLORS: Record<Climate, string> = {
    [Climate.COLD]: '#92c5de',
    [Climate.HOT]: '#ca0020',
    [Climate.VERY_COLD]: '#0571b0',
    [Climate.NEUTRAL]: '#f7f7f7',
    [Climate.WARM]: '#f4a582'
  };

  // Średnia jasność, żeby dało się potem skalować intensywność po enchantmentLevel; NONE celowo wyblakły
  export const ENCHANT_COLORS: Record<EnchantType, string> = {
    [EnchantType.ABYSS]: '#e34948',
    [EnchantType.CAITHALOON]: '#eda100',
    [EnchantType.CORELLIA]: '#e87ba4',
    [EnchantType.GHALAGAAR]: '#8a5a2b',
    [EnchantType.LIMBO]: '#1baf7a',
    [EnchantType.NERENETH]: '#008300',
    [EnchantType.NONE]: '#e0dfda',
    [EnchantType.TAELIA]: '#2a78d6',
    [EnchantType.VEIL]: '#4fc1d9',
    [EnchantType.VOID]: '#4a3aa7'
  };

  // Rodziny: organiczne (zielenie, brązy), osadowe (beże, biele), skaliste (szarości),
  // wulkaniczne (ciemna czerwień), skrajne (lód, sól, kwas)
  export const SOIL_COLORS: Record<SoilType, string> = {
    [SoilType.ACIDIC]: '#b7c62f',
    [SoilType.ALLUVIAL]: '#7d8f5a',
    [SoilType.ASHEN]: '#d5cfcf',
    [SoilType.BARE_CRAG]: '#aab4bd',
    [SoilType.BASALTIC]: '#3f4448',
    [SoilType.BLACK]: '#262421',
    [SoilType.CHALKY]: '#f2f0e6',
    [SoilType.CLAY]: '#c1693c',
    [SoilType.FERTILE]: '#5a9e3a',
    [SoilType.GRAVELLY]: '#a39e93',
    [SoilType.HARDPAN]: '#b08f6a',
    [SoilType.HUMUS_RICH]: '#4a3b22',
    [SoilType.LIMESTONE]: '#cfcab4',
    [SoilType.LOAMY]: '#9b7653',
    [SoilType.LOESS]: '#d8b46a',
    [SoilType.PEAT]: '#6b4f2f',
    [SoilType.PERMAFROST]: '#bfe3f2',
    [SoilType.ROCKY]: '#8c8c8c',
    [SoilType.SALINE]: '#f3d6e4',
    [SoilType.SANDY]: '#e8d39a',
    [SoilType.SHALE_TERRAIN]: '#5f6b7a',
    [SoilType.TANGLED]: '#2f6b3a',
    [SoilType.VOLCANIC]: '#8b2a1e'
  };
