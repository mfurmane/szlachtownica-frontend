import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { MapSelection } from '../../services/map-selection.service';
import { Characteristic, Place } from '../../shared/map';
import { CHARACTERISTIC_LABELS, CharacteristicSelection, regionAsCharacteristicSelection } from '../../shared/legend';
import { DecimalPipe } from '@angular/common';
import { getPlaceCharacteristicLabels, getTypeLabel } from '../../shared/places-data';
import _ from 'lodash';

@Component({
  selector: 'app-map-tooltip',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './map-tooltip.component.html',
  styleUrl: './map-tooltip.component.scss'
})
export class MapTooltipComponent {

  readonly selection: InputSignal<MapSelection> = input.required<MapSelection>();
  readonly characteristic: InputSignal<Characteristic> = input.required<Characteristic>();
  readonly value: Signal<CharacteristicSelection> = computed((): CharacteristicSelection =>
    regionAsCharacteristicSelection(this.characteristic(), this.selection().region));
  readonly placeCharacteristics: Signal<Array<string>> = computed((): Array<string> => {
    const place: Place | undefined = this.selection().place;
    if (!_.isNil(place)) {
      return getPlaceCharacteristicLabels(place.placeCharacteristics);
    }
    return [];
  });

  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;
  readonly Characteristic: typeof Characteristic = Characteristic;
  readonly getTypeLabel: (place: Place) => string = getTypeLabel;

}
