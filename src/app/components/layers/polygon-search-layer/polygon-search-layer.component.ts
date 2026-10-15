import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { onlyType, ResultType, SearchResult } from '../../../shared/search';
import { SearchService } from '../../../services/search.service';
import { Province, toPath } from '../../../shared/map';
import _ from 'lodash';

interface ProvinceResult {
  province: Province;
  path: string;
}

@Component({
  selector: 'g[appPolygonSearchLayer]',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './polygon-search-layer.component.html',
  styleUrl: './polygon-search-layer.component.scss'
})
export class PolygonSearchLayerComponent {
  private readonly searchService: SearchService = inject(SearchService);

  readonly provinceResults$: Observable<Array<ProvinceResult>> = this.searchService.results$.pipe(
    onlyType(ResultType.PROVINCE),
    map((values: Array<SearchResult>) => values
      .filter((value: SearchResult) => !_.isNil(value.province))
      .flatMap((value: SearchResult) => {
        return _.isNil(value.province) ? [] : [{ province: value.province, path: toPath(value.province.area) }];
      }))
  );
}
