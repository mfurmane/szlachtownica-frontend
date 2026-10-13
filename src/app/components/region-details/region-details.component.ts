import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';
import { Characteristic, Place, PlaceCharacteristic, Region } from '../../shared/map';
import { CHARACTERISTIC_LABELS, CharacteristicSelection, regionAsCharacteristicSelection } from '../../shared/legend';
import { DecimalPipe } from '@angular/common';
import { MapSelection } from '../../services/map-selection.service';
import { getPlaceCharacteristicLabels, getTypeLabel } from '../../shared/places-data';
import _ from 'lodash';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.scss'
})
export class RegionDetailsComponent {

  readonly selection: InputSignal<MapSelection> = input.required<MapSelection>();
  readonly values: Signal<Array<CharacteristicSelection>> = computed((): Array<CharacteristicSelection> =>
    Object.values(Characteristic).map((characteristic: Characteristic) =>
      regionAsCharacteristicSelection(characteristic, this.selection().region)
    ));
  readonly characteristicSelected: OutputEmitterRef<CharacteristicSelection> = output<CharacteristicSelection>();

  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;
  readonly getTypeLabel: (place: Place) => string = getTypeLabel;
  readonly placeCharacteristics: Signal<Array<string>> = computed((): Array<string> => {
    const place: Place | undefined = this.selection().place;
    if (!_.isNil(place)) {
      return getPlaceCharacteristicLabels(place.placeCharacteristics);
    }
    return [];
  });

}
