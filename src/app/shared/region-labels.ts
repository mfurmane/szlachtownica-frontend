import { Climate, EnchantType, Humidity, RegionType, SoilType, TerrainShape } from "../dto/Map";

  export const REGION_TYPE_LABELS: Record<RegionType, string> = {
    [RegionType.ABANDONED_REACH]: 'Opuszczony',
    [RegionType.CRAFTS_LAND]: 'Rzemieślniczy',
    [RegionType.DUST_PLAIN]: 'Pyłowa równina',
    [RegionType.ESTATE_REGION]: 'Szlachecki',
    [RegionType.FARMING_LAND]: 'Rolniczy',
    [RegionType.FOREST]: 'Las',
    [RegionType.IRON_MARCHES]: 'Metalowe zagłębie',
    [RegionType.MEADOWS]: 'Łąka',
    [RegionType.PINE_CRAG]: 'Kosodrzewina',
    [RegionType.ROCK_LAND]: 'Skalisty',
    [RegionType.SETTLERS_REACH]: 'Osadniczy',
    [RegionType.SUPERNATURAL_EXPANSE]: 'Zagłębie magiczne',
    [RegionType.SWAMP]: 'Bagno',
    [RegionType.TOURISTIC_LAND]: 'Turystyczny'
  };

  export const TERRAIN_SHAPE_LABELS: Record<TerrainShape, string> = {
    [TerrainShape.BADLANDS]: 'Trudny teren',
    [TerrainShape.CANYONS]: 'Kaniony',
    [TerrainShape.FLATLANDS]: 'Równina',
    [TerrainShape.HIGHLANDS]: 'Wyżyna',
    [TerrainShape.HILLS]: 'Wzgórza',
    [TerrainShape.MOUNTAINS]: 'Góry',
    [TerrainShape.PLATEAUS]: 'Płaskowyż',
    [TerrainShape.VALLEY]: 'Dolina',
    [TerrainShape.WETBASIN]: 'Teren podmokły'
  };

  export const HUMIDITY_LABELS: Record<Humidity, string> = {
    [Humidity.DRY]: 'Mała',
    [Humidity.EXTRA_DRY]: 'Ekstremalnie mała',
    [Humidity.EXTRA_WET]: 'Ekstremalnie duża',
    [Humidity.NEUTRAL]: 'Średnia',
    [Humidity.WET]: 'Duża'
  };

  export const CLIMATE_LABELS: Record<Climate, string> = {
    [Climate.COLD]: 'Chłodny',
    [Climate.HOT]: 'Gorący',
    [Climate.VERY_COLD]: 'Zimny',
    [Climate.NEUTRAL]: 'Neutralny',
    [Climate.WARM]: 'Ciepły'
  };

  export const ENCHANT_LABELS: Record<EnchantType, string> = {
    [EnchantType.ABYSS]: 'Czeluść',
    [EnchantType.CAITHALOON]: 'Caithaloon',
    [EnchantType.CORELLIA]: 'Corellia',
    [EnchantType.GHALAGAAR]: 'Ghalagaar',
    [EnchantType.LIMBO]: 'Otchłań',
    [EnchantType.NERENETH]: 'Nereneth',
    [EnchantType.NONE]: '-',
    [EnchantType.TAELIA]: 'Taelia',
    [EnchantType.VEIL]: 'Wymiar duchowy',
    [EnchantType.VOID]: 'Pustka'
  };

  export const SOIL_LABELS: Record<SoilType, string> = {
    [SoilType.ACIDIC]: 'Kwasowa',
    [SoilType.ALLUVIAL]: 'Aluwialna',
    [SoilType.ASHEN]: 'Popielna',
    [SoilType.BARE_CRAG]: 'Naga skała',
    [SoilType.BASALTIC]: 'Bazaltowa',
    [SoilType.BLACK]: 'Czarnoziem',
    [SoilType.CHALKY]: 'Kredowa',
    [SoilType.CLAY]: 'Gliniasta',
    [SoilType.FERTILE]: 'Żyzna',
    [SoilType.GRAVELLY]: 'Żwirowa',
    [SoilType.HARDPAN]: 'Twarda',
    [SoilType.HUMUS_RICH]: 'Próchnicowa',
    [SoilType.LIMESTONE]: 'Wapienna',
    [SoilType.LOAMY]: 'Iłowa',
    [SoilType.LOESS]: 'Lessowa',
    [SoilType.PEAT]: 'Torfowa',
    [SoilType.PERMAFROST]: 'Wieczna zmarzlina',
    [SoilType.ROCKY]: 'Skalista',
    [SoilType.SALINE]: 'Zasolona',
    [SoilType.SANDY]: 'Piaszczysta',
    [SoilType.SHALE_TERRAIN]: 'Łupki',
    [SoilType.TANGLED]: 'Splątana',
    [SoilType.VOLCANIC]: 'Wulkaniczna'
  };
