import { ChangeDetectionStrategy, Component, effect, inject, Signal } from '@angular/core';
import { MapSelection, MapSelectionService } from '../../services/map-selection.service';
import _ from 'lodash';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
  private readonly router: Router = inject(Router);

  private readonly selection: Signal<MapSelection | undefined> = this.selectionService.selection;

  constructor() {
    effect(() => {
      const selection: MapSelection | undefined = this.selection();
      if (!_.isNil(selection)) {
        this.router.navigate(['/details']);
      }
    });
  }
}
