import { ChangeDetectionStrategy, Component, computed, effect, inject, input, InputSignal, Signal } from '@angular/core';
import { ColoringService } from '../../services/coloring.service';
import { MapSelectionService } from '../../services/map-selection.service';
import { CharacteristicSelection } from '../../shared/legend';
import { SelectionDetailsComponent } from '../selection-details/selection-details.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorldStateService } from '../../services/world-state.service';
import { findMapSelection, MapSelection, Province } from '../../shared/map';

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
  private readonly worldStateService: WorldStateService = inject(WorldStateService);

  readonly regionId: InputSignal<string | undefined> = input<string>();
  readonly placeId: InputSignal<string | undefined> = input<string>();

  private readonly provinces: Signal<Array<Province>> = toSignal(this.worldStateService.provinces$, { initialValue: [] });

  readonly selection: Signal<MapSelection | undefined> = this.selectionService.selection;
  private readonly selectedValue: Signal<MapSelection | undefined> = computed((): MapSelection | undefined => {
    const provincesValue: Array<Province> = this.provinces();
    const regionIdValue: string | undefined = this.regionId();
    const placeIdValue: string | undefined = this.placeId();
    return findMapSelection(provincesValue, regionIdValue, placeIdValue);
  });

  constructor() {
    effect(() => {
      const selectedValue: MapSelection | undefined = this.selectedValue();
      this.selectionService.setSelection(selectedValue);
    }, { allowSignalWrites: true });
  }

  onCharacteristicSelected(selection: CharacteristicSelection): void {
    this.coloringService.showCategory(selection.characteristic, selection.row);
  }

  clearSelection(): void {
    this.selectionService.clearSelection();
  }

}
