import { ExtendedPlace, Province } from './map';

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
