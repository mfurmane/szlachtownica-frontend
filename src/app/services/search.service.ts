import { inject, Injectable } from '@angular/core';
import { placeResult, provinceResult, SearchResult } from '../shared/search';
import { WorldStateService } from './world-state.service';
import { debounceTime, distinctUntilChanged, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { allPlaces, ExtendedPlace, Province } from '../shared/map';
import { getPlaceCharacteristicLabels } from '../shared/places-data';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly provinces$: Observable<Array<Province>> = this.worldStateService.provinces$;

  readonly searchField: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  readonly results$: Observable<Array<SearchResult> | undefined> = this.searchField.valueChanges.pipe(
    debounceTime(300),
    map((query: string) => query.trim().toLowerCase()),
    distinctUntilChanged(),
    switchMap((query: string) => {
      if (query.length > 1) {
        return this.search(query);
      } else {
        return of(undefined);
      }
    }),
    shareReplay(1));

  clear(): void {
    this.searchField.reset();
  }

  private search(query: string): Observable<Array<SearchResult>> {
    return this.provinces$.pipe(map((provinces: Array<Province>) => {
      const placeResults = allPlaces(provinces)
        .filter((place: ExtendedPlace) => this.placeFitsQuery(place, query))
        .map((place: ExtendedPlace) => placeResult(place));
      const provinceResults = provinces
        .filter((province: Province) => this.provinceFitsQuery(province, query))
        .map((province: Province) => provinceResult(province));
      return [...placeResults, ...provinceResults];
    }));
  }

  private provinceFitsQuery(province: Province, query: string): boolean {
    return province.name.toLowerCase().includes(query);
  }

  private placeFitsQuery(place: ExtendedPlace, query: string): boolean {
    if (place.place.name.toLowerCase().includes(query)) {
      return true;
    }
    return getPlaceCharacteristicLabels(place.place.placeCharacteristics).some((tag: string) => tag.toLowerCase().includes(query));
  }

}
