import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { MapSelection, MapSelectionService } from '../../services/map-selection.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);

  readonly detailsPath: Signal<Array<string | number>> = computed((): Array<string | number> => {
    const selection: MapSelection | undefined = this.selectionService.selection();
    return this.selectionService.pathToSelection(selection);
  });
}
