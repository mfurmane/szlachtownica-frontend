import { Component, inject, OnInit } from '@angular/core';
import _ from 'lodash';
import { Province, Region, SubProvince } from '../../dto/Map';
import { WindowService } from '../../services/window.service';
import { RegionDetailsComponent } from '../region-details/region-details.component';
import { ColoringStrategyComponent } from '../coloring-strategy/coloring-strategy.component';
import { CharacteristicSelection } from '../../shared/legend';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [RegionDetailsComponent, ColoringStrategyComponent],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent implements OnInit {

  window: WindowService = inject(WindowService);
  private coloringService: ColoringStrategyService = inject(ColoringStrategyService);

  province?: string;
  subprovince?: number;
  region?: Region;

  onCharacteristicSelected(selection: CharacteristicSelection): void {
    this.coloringService.showCategory(selection.characteristic, selection.row);
  }

  ngOnInit(): void {
    this.window.province$.subscribe((prov: Province | undefined) => {
      if (_.isNil(prov)) {
        this.province = undefined;
      } else {
        this.province = prov.name;
      }
    });
    this.window.subProvince$.subscribe((prov: SubProvince | undefined) => {
      if (_.isNil(prov)) {
        this.subprovince = undefined;
      } else {
        this.subprovince = prov.id;
      }
    });
    this.window.region$.subscribe((prov: Region | undefined) => {
      if (_.isNil(prov)) {
        this.region = undefined;
      } else {
        this.region = prov;
      }
    });
  }

}
