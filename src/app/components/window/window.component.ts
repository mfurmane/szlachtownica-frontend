import { Component, inject, OnInit } from '@angular/core';
import _ from 'lodash';
import { Region } from '../../dto/Map';
import { WindowService } from '../../services/window.service';
import { RegionDetailsComponent } from '../region-details/region-details.component';
import { ColoringStrategyComponent } from '../coloring-strategy/coloring-strategy.component';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [RegionDetailsComponent, ColoringStrategyComponent],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent implements OnInit {

  window: WindowService = inject(WindowService);

  province?: string;
  subprovince?: number;
  region?: Region;

    ngOnInit() {
      this.window.province$.subscribe((prov) => {
        if (_.isNil(prov)) {
          this.province = undefined;
        } else {
          this.province = prov.name;
        }
      });
      this.window.subProvince$.subscribe((prov) => {
        if (_.isNil(prov)) {
          this.subprovince = undefined;
        } else {
          this.subprovince = prov.id;
        }
      });
      this.window.region$.subscribe((prov) => {
        if (_.isNil(prov)) {
          this.region = undefined;
        } else {
          this.region = prov;
        }
      });
    }

}
