import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ColoringService } from '../../services/coloring.service';
import { MapSelectionService, MapSelection } from '../../services/map-selection.service';
import { CharacteristicSelection } from '../../shared/legend';
import { SelectionDetailsComponent } from '../selection-details/selection-details.component';

@Component({
  selector: 'app-details-view',
  standalone: true,
  imports: [SelectionDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details-view.component.html',
  styleUrl: './details-view.component.scss'
})
export class DetailsViewComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly coloringService: ColoringService = inject(ColoringService);

  readonly selection: Signal<MapSelection | undefined> = this.selectionService.selection;

  onCharacteristicSelected(selection: CharacteristicSelection): void {
    this.coloringService.showCategory(selection.characteristic, selection.row);
  }

  clearSelection(): void {
    this.selectionService.clearSelection();
  }

}
