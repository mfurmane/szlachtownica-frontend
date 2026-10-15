import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { MapSelection } from '../../services/map-selection.service';
import { Characteristic, Place } from '../../shared/map';
import { CHARACTERISTIC_LABELS, CharacteristicSelection, regionAsCharacteristicSelection } from '../../shared/legend';
import { DecimalPipe } from '@angular/common';
import { getPlaceCharacteristicLabels, getTypeLabel } from '../../shared/places-data';
import _ from 'lodash';

@Component({
  selector: 'app-region-tooltip',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './region-tooltip.component.html',
  styleUrl: './region-tooltip.component.scss'
})
export class RegionTooltipComponent {

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
