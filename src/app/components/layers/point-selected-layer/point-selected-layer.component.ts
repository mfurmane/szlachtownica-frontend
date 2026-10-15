import { Component, inject } from '@angular/core';
import { MapSelectionService, MapSelection } from '../../../services/map-selection.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'g[appPointSelectedLayer]',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './point-selected-layer.component.html',
  styleUrl: './point-selected-layer.component.scss'
})
export class PointSelectedLayerComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  readonly selection$: Observable<MapSelection | undefined> = this.selectionService.selection$;
}
