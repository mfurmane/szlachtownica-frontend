import { inject, Injectable } from '@angular/core';
import { filter, fromEvent, Observable, share } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { MapSelectionService } from './map-selection.service';
import { SearchService } from './search.service';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  private readonly document: Document = inject(DOCUMENT);
  private readonly mapSelectionService: MapSelectionService = inject(MapSelectionService);
  private readonly searchService: SearchService = inject(SearchService);
  private readonly filterService: FilterService = inject(FilterService);

  readonly escape$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
    filter((event: KeyboardEvent) => event.key === 'Escape'),
    share()
  );

  constructor() {
    this.escape$.subscribe(() => {
      this.mapSelectionService.clearSelection();
      this.searchService.clear();
      this.filterService.clear();
    });
  }

}
