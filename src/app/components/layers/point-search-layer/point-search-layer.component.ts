import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from '../../../services/search.service';
import { SearchResult, onlyType, ResultType } from '../../../shared/search';

@Component({
  selector: 'g[appPointSearchLayer]',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './point-search-layer.component.html',
  styleUrl: './point-search-layer.component.scss'
})
export class PointSearchLayerComponent {
  private readonly searchService: SearchService = inject(SearchService);
  readonly results$: Observable<Array<SearchResult>> = this.searchService.results$.pipe(onlyType(ResultType.PLACE));
}
