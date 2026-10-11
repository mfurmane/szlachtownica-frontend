import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';
import { Characteristic, Region } from '../../shared/map';
import { CHARACTERISTIC_LABELS, CharacteristicSelection, regionAsCharacteristicSelection } from '../../shared/legend';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.scss'
})
export class RegionDetailsComponent {

  readonly region: InputSignal<Region> = input.required<Region>();
  readonly values: Signal<Array<CharacteristicSelection>> = computed((): Array<CharacteristicSelection> =>
    Object.values(Characteristic).map((characteristic: Characteristic) =>
      regionAsCharacteristicSelection(characteristic, this.region())
    ));
  readonly characteristicSelected: OutputEmitterRef<CharacteristicSelection> = output<CharacteristicSelection>();

  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

}
