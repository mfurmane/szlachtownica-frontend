import { Component, computed, inject, Signal } from '@angular/core';
import { MapSelectionService, MapSelection } from '../../../services/map-selection.service';
import { toPath } from '../../../shared/map';
import _ from 'lodash';

@Component({
  selector: 'g[appPolygonSelectedLayer]',
  standalone: true,
  imports: [],
  templateUrl: './polygon-selected-layer.component.html',
  styleUrl: './polygon-selected-layer.component.scss'
})
export class PolygonSelectedLayerComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  readonly selectedPath: Signal<string | undefined> = computed((): string | undefined => {
    const selection: MapSelection | undefined = this.selectionService.selection();
    if (_.isNil(selection) || !_.isNil(selection.place)) {
      return undefined;
    }
    return toPath(selection.region.area);
  });
}
