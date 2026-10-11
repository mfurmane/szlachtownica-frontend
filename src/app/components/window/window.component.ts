import { Component, inject } from '@angular/core';
import { MapSelection, MapSelectionService } from '../../services/map-selection.service';
import { RegionDetailsComponent } from '../region-details/region-details.component';
import { CharacteristicSelection } from '../../shared/legend';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [RegionDetailsComponent, AsyncPipe],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly coloringService: ColoringStrategyService = inject(ColoringStrategyService);

  readonly selection$: Observable<MapSelection | undefined> = this.selectionService.selection$;

  onCharacteristicSelected(selection: CharacteristicSelection): void {
    this.coloringService.showCategory(selection.characteristic, selection.row);
  }

  clearSelection(): void {
    this.selectionService.clearSelection();
  }

}
