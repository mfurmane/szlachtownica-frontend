import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MapSelectionService, MapSelection } from '../../../services/map-selection.service';
import { toPath } from '../../../shared/map';
import _ from 'lodash';

@Component({
  selector: 'g[appPolygonSelectedLayer]',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './polygon-selected-layer.component.html',
  styleUrl: './polygon-selected-layer.component.scss'
})
export class PolygonSelectedLayerComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  readonly selection$: Observable<string | undefined> = this.selectionService.selection$.pipe(
    map((value: MapSelection | undefined) => {
      if (_.isNil(value) || !_.isNil(value.place)) {
        return undefined;
      }
      return toPath(value.region.area);
    })
  );
}
