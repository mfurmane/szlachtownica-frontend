import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ResultType, SearchResult } from '../../shared/search';
import { SearchService } from '../../services/search.service';
import { getTypeLabel } from '../../shared/places-data';
import { ExtendedPlace, Place, Province } from '../../shared/map';
import { MapSelectionService } from '../../services/map-selection.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  readonly ResultType: typeof ResultType = ResultType;
  readonly getTypeLabel: (place: Place) => string = getTypeLabel;

  private readonly searchService: SearchService = inject(SearchService);
  readonly results$: Observable<Array<SearchResult> | undefined> = this.searchService.results$;
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);

  handleQuery(query: string): void {
    this.searchService.setText(query);
  }

  showProvince(province: Province): void {
    //TODO
  }

  showPlace(place: ExtendedPlace): void {
    this.selectionService.setSelection(place);
  }

}
