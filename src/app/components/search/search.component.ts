import { Component, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
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

  private readonly textSubject: Subject<string> = new Subject<string>();
  private readonly searchService: SearchService = inject(SearchService);
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);

  readonly results$: Observable<Array<SearchResult> | undefined> = this.textSubject.pipe(
    debounceTime(300),
    map((query: string) => query.trim().toLowerCase()),
    distinctUntilChanged(),
    map((query: string) => {
      if (query.length > 1) {
        return this.searchService.search(query);
      } else {
        return undefined;
      }
    }
  ));

  handleQuery(query: string): void {
    this.textSubject.next(query);
  }

  showProvince(province: Province): void {
    //TODO
    console.log(province);
  }

  showPlace(place: ExtendedPlace): void {
    this.selectionService.setSelection(place);
  }

}
