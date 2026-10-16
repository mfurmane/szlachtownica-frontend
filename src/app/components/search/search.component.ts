import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ResultType, SearchResult } from '../../shared/search';
import { SearchService } from '../../services/search.service';
import { getTypeLabel } from '../../shared/places-data';
import { ExtendedPlace, Place, Province } from '../../shared/map';
import { MapSelectionService } from '../../services/map-selection.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly searchService: SearchService = inject(SearchService);

  readonly ResultType: typeof ResultType = ResultType;
  readonly getTypeLabel: (place: Place) => string = getTypeLabel;

  readonly results$: Observable<Array<SearchResult> | undefined> = this.searchService.results$;
  readonly searchField: FormControl<string> = this.searchService.searchField;

  showProvince(province: Province): void {
    //TODO
  }

  showPlace(place: ExtendedPlace): void {
    this.selectionService.setSelection(place);
  }

}
