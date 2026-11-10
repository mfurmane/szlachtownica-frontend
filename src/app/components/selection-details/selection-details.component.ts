import { ChangeDetectionStrategy, Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';
import { Characteristic, MapSelection, Place } from '../../shared/map';
import { CHARACTERISTIC_LABELS, CharacteristicSelection, regionAsCharacteristicSelection } from '../../shared/legend';
import { DecimalPipe } from '@angular/common';
import { getPlaceCharacteristicLabels } from '../../shared/places-data';
import _ from 'lodash';
import { PlaceTypeLabelPipe } from '../../pipes/place-type-label.pipe';

@Component({
  selector: 'app-selection-details',
  standalone: true,
  imports: [DecimalPipe, PlaceTypeLabelPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selection-details.component.html',
  styleUrl: './selection-details.component.scss'
})
export class SelectionDetailsComponent {

  readonly selection: InputSignal<MapSelection> = input.required<MapSelection>();
  readonly values: Signal<Array<CharacteristicSelection>> = computed((): Array<CharacteristicSelection> =>
    Object.values(Characteristic).map((characteristic: Characteristic) =>
      regionAsCharacteristicSelection(characteristic, this.selection().region)
    ));
  readonly characteristicSelected: OutputEmitterRef<CharacteristicSelection> = output<CharacteristicSelection>();

  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;
  readonly placeCharacteristics: Signal<Array<string>> = computed((): Array<string> => {
    const place: Place | undefined = this.selection().place;
    if (!_.isNil(place)) {
      return getPlaceCharacteristicLabels(place.placeCharacteristics);
    }
    return [];
  });

}
