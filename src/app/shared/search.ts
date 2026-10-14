import { map, OperatorFunction } from 'rxjs';
import { ExtendedPlace, Province } from './map';
import _ from 'lodash';

export interface SearchResult {
  type: ResultType;
  identifier: string;
  place?: ExtendedPlace;
  province?: Province;
}

export enum ResultType {
  PLACE = 'PLACE',
  PROVINCE = 'PROVINCE'
}

export function placeResult(place: ExtendedPlace): SearchResult {
  return { type: ResultType.PLACE, identifier: ResultType.PLACE + place.place.id, place };
}

export function provinceResult(province: Province): SearchResult {
  return { type: ResultType.PROVINCE, identifier: ResultType.PROVINCE + province.id, province };
}

export function onlyType(type: ResultType): OperatorFunction<Array<SearchResult> | undefined, Array<SearchResult>> {
  return map((values: Array<SearchResult> | undefined) => {
    if (_.isNil(values)) {
      return [];
    }
    return values.filter((value: SearchResult) => value.type === type);
  });
}
