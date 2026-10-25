import { map, OperatorFunction } from 'rxjs';
import { ExtendedPlace, Province } from './map';
import _ from 'lodash';

export interface SearchResult {
  type: ResultType;
  identifier: string;
  extendedPlace?: ExtendedPlace;
  province?: Province;
}

export enum ResultType {
  PLACE = 'PLACE',
  PROVINCE = 'PROVINCE'
}

export function placeResult(extendedPlace: ExtendedPlace): SearchResult {
  return { type: ResultType.PLACE, identifier: ResultType.PLACE + extendedPlace.place.id, extendedPlace };
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
