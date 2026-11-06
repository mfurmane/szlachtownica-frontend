import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ColoringService } from '../../services/coloring.service';
import { MapSelectionService, MapSelection } from '../../services/map-selection.service';
import { CharacteristicSelection } from '../../shared/legend';
import { SelectionDetailsComponent } from '../selection-details/selection-details.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WorldStateService } from '../../services/world-state.service';
import { allExtendedRegions, allPlaces, ExtendedPlace, ExtendedRegion, Province } from '../../shared/map';

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
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  readonly selection: Signal<MapSelection | undefined> = this.selectionService.selection;

  constructor() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap): Observable<MapSelection | undefined> => {
        return this.worldStateService.provinces$.pipe(
          map((provinces: Array<Province>): MapSelection | undefined => this.findMapSelection(provinces, params))
        );
      }),
      takeUntilDestroyed()
    ).subscribe((selection: MapSelection | undefined) => {
      this.selectionService.setSelection(selection);
    });
  }

  onCharacteristicSelected(selection: CharacteristicSelection): void {
    this.coloringService.showCategory(selection.characteristic, selection.row);
  }

  clearSelection(): void {
    this.selectionService.clearSelection();
  }

  private findMapSelection(provinces: Array<Province>, params: ParamMap): MapSelection | undefined {
    if (params.has('regionId')) {
      const regionId: number = Number(params.get('regionId'));
      return allExtendedRegions(provinces).find((region: ExtendedRegion) => region.region.id === regionId);
    } else if (params.has('placeId')) {
      const placeId: number = Number(params.get('placeId'));
      return allPlaces(provinces).find((place: ExtendedPlace) => place.place.id === placeId);
    } else {
      return undefined;
    }
  }

}
