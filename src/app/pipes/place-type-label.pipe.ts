import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../shared/map';
import { getTypeLabel } from '../shared/places-data';

@Pipe({
  name: 'placeTypeLabel',
  standalone: true
})
export class PlaceTypeLabelPipe implements PipeTransform {

  transform(place: Place): string {
    return getTypeLabel(place);
  }

}
