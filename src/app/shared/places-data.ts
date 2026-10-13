import { Place, PlaceCharacteristic, PlaceType } from './map';

export function getTypeLabel(place: Place): string {
  switch (place.type) {
    case PlaceType.SETTLEMENT: {
      //TODO po dodaniu populacji itp rozbudować
      return 'Miasto';
    }
    default: return PLACE_TYPE_LABELS[place.type];
  }
}

export function getPlaceCharacteristicLabels(characteristics: Array<PlaceCharacteristic>): Array<string> {
  return characteristics.map((characteristic: PlaceCharacteristic) => PLACE_CHARACTERISTIC_LABELS[characteristic]);
}

const PLACE_CHARACTERISTIC_LABELS: Record<PlaceCharacteristic, string> = {
  [PlaceCharacteristic.CAPITAL]: 'Stolica królestwa',
  [PlaceCharacteristic.LOCAL_CAPITAL]: 'Stolica prowincji',
  [PlaceCharacteristic.FORTIFIED]: 'Posiada fortyfikacje',
  [PlaceCharacteristic.RIVER_PORT]: 'Port rzeczny',
  [PlaceCharacteristic.SEA_PORT]: 'Port morski',
  [PlaceCharacteristic.RESORT]: 'Kurort',
  [PlaceCharacteristic.LUMBERING]: 'Ośrodek drwalski',
  [PlaceCharacteristic.HUNTING]: 'Ośrodek myśliwski',
  [PlaceCharacteristic.FISHING]: 'Ośrodek rybacki',
  [PlaceCharacteristic.FARMING]: 'Ośrodek hodowlany',
  [PlaceCharacteristic.PLANTING]: 'Ośrodek plantacyjny',
  [PlaceCharacteristic.TRADING]: 'Ośrodek handlowy',
  [PlaceCharacteristic.ARTISAN]: 'Ośrodek rzemieślniczy',
  [PlaceCharacteristic.MILITARY]: 'Ośrodek wojskowy',
  [PlaceCharacteristic.MINING]: 'Ośrodek górniczy',
  [PlaceCharacteristic.ENCHANTED]: 'Zaklęte miejsce',
  [PlaceCharacteristic.WILDERNESS_ENCHANT]: 'Bliskość Nereneth'
};

const PLACE_TYPE_LABELS: Record<PlaceType, string> = {
  [PlaceType.SETTLEMENT]: 'Miasto',
  [PlaceType.NOBLE_MANOR]: 'Dwór',
  [PlaceType.NOBLE_RESIDENCE]: 'Rezydencja',
  [PlaceType.COURT]: 'Siedziba władzy',
  [PlaceType.MONASTERY]: 'Klasztor',
  [PlaceType.FORTRESS]: 'Twierdza',
  [PlaceType.ENCHANT_CENTER]: 'Centrum magiczne',
  [PlaceType.LAKE]: 'Jezioro',
  [PlaceType.RIVER]: 'Rzeka',
  [PlaceType.ROAD]: 'Droga',
};
