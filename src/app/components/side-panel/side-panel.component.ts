import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MapSelection, MapSelectionService } from '../../services/map-selection.service';
import { SelectionDetailsComponent } from '../selection-details/selection-details.component';
import { CharacteristicSelection } from '../../shared/legend';
import { ColoringService } from '../../services/coloring.service';
import { SearchComponent } from '../search/search.component';
import { RegionFilterComponent } from '../../components/forms/region-filter/region-filter.component';
import { ColoringSettingsComponent } from '../forms/coloring-settings/coloring-settings.component';

enum SideView {
  SEARCH='SEARCH',
  FILTER='FILTER',
  DETAILS='DETAILS',
  SETTINGS='SETTINGS'
}

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [SelectionDetailsComponent, SearchComponent, RegionFilterComponent, ColoringSettingsComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly coloringService: ColoringService = inject(ColoringService);

  readonly selection: Signal<MapSelection | undefined> = this.selectionService.selection;

  readonly SideView: typeof SideView = SideView;
  readonly selectedView: WritableSignal<SideView> = signal<SideView>(SideView.DETAILS);

  onCharacteristicSelected(selection: CharacteristicSelection): void {
    this.coloringService.showCategory(selection.characteristic, selection.row);
  }

  clearSelection(): void {
    this.selectionService.clearSelection();
  }
}
