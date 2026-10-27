import { Component, inject, Signal } from '@angular/core';
import { MapSelectionService, MapSelection } from '../../../services/map-selection.service';

@Component({
  selector: 'g[appPointSelectedLayer]',
  standalone: true,
  imports: [],
  templateUrl: './point-selected-layer.component.html',
  styleUrl: './point-selected-layer.component.scss'
})
export class PointSelectedLayerComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  readonly selection: Signal<MapSelection | undefined> = this.selectionService.selection;
}
