import { Component, inject } from '@angular/core';
import { WindowService } from '../../services/window.service';
import _ from 'lodash';
import { Climate, EnchantType, Humidity, Region, RegionType, SoilType, TerrainShape } from '../../dto/Map';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {

  window: WindowService = inject(WindowService);

  province?: string;
  subprovince?: number;
  region?: Region;

  regionTypeLabels: Record<RegionType, string> = {
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

  terrainShapeLabels: Record<TerrainShape, string> = {
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

  humidityLabels: Record<Humidity, string> = {
    [Humidity.DRY]: 'Mała',
    [Humidity.EXTRA_DRY]: 'Ekstremalnie mała',
    [Humidity.EXTRA_WET]: 'Ekstremalnie duża',
    [Humidity.NEUTRAL]: 'Średnia',
    [Humidity.WET]: 'Duża'
  };

  climateLabels: Record<Climate, string> = {
    [Climate.COLD]: 'Chłodny',
    [Climate.HOT]: 'Gorący',
    [Climate.VERY_COLD]: 'Zimny',
    [Climate.NEUTRAL]: 'Neutralny',
    [Climate.WARM]: 'Ciepły'
  };

  enchantLabels: Record<EnchantType, string> = {
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

  soilLabels: Record<SoilType, string> = {
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

    ngOnInit() {
      this.window.province$.subscribe(prov => {
        if (_.isNil(prov)) {
          this.province = undefined;
        } else {
          this.province = prov.name;
        }
      });
      this.window.subProvince$.subscribe(prov => {
        if (_.isNil(prov)) {
          this.subprovince = undefined;
        } else {
          this.subprovince = prov.id;
        }
      });
      this.window.region$.subscribe(prov => {
        if (_.isNil(prov)) {
          this.region = undefined;
        } else {
          this.region = prov;
        }
      });
    }

}
