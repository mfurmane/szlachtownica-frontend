import { inject, Injectable } from '@angular/core';
import { placeResult, provinceResult, SearchResult } from '../shared/search';
import { WorldStateService } from './world-state.service';
import { Observable } from 'rxjs';
import { allPlaces, ExtendedPlace, Province } from '../shared/map';
import { getPlaceCharacteristicLabels } from '../shared/places-data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly provinces$: Observable<Array<Province>> = this.worldStateService.provinces$;
  private provinces: Array<Province> = [];
  private places: Array<ExtendedPlace> = [];

  constructor() {
    this.provinces$.subscribe((values: Array<Province>) => {
      this.provinces = values;
      this.places = allPlaces(values);
    });
  }

  search(query: string): Array<SearchResult> {
    const placeResults = this.places
      .filter((place: ExtendedPlace) => this.placeFitsQuery(place, query))
      .map((place: ExtendedPlace) => placeResult(place));
    const provinceResults = this.provinces
      .filter((province: Province) => this.provinceFitsQuery(province, query))
      .map((province: Province) => provinceResult(province));
    return [...placeResults, ...provinceResults];
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
