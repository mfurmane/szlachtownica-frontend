import { PlaceType } from '../shared/map';
import { createPlace } from '../testing/test-data';
import { PlaceTypeLabelPipe } from './place-type-label.pipe';

describe('PlaceTypeLabelPipe', () => {
  const pipe: PlaceTypeLabelPipe = new PlaceTypeLabelPipe();

  // Etykiety wpisane ręcznie, a nie wzięte z PLACE_TYPE_LABELS: test, który porównuje tabelę z nią samą, zawsze przejdzie.
  // Record<PlaceType, string> wymaga kompletu, więc po dodaniu nowego typu miejsca test się nie skompiluje, co jest oczekiwane
  const expectedLabels: Record<PlaceType, string> = {
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

  for (const type of Object.values(PlaceType)) {
    it(`zwraca „${expectedLabels[type]}” dla ${type}`, () => {
      expect(pipe.transform(createPlace({ type }))).toBe(expectedLabels[type]);
    });
  }
});
