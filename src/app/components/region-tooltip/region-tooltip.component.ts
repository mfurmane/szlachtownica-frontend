import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { MapSelection } from '../../services/map-selection.service';
import { Characteristic } from '../../shared/map';
import { CHARACTERISTIC_LABELS, CharacteristicSelection, regionAsCharacteristicSelection } from '../../shared/legend';

@Component({
  selector: 'app-region-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './region-tooltip.component.html',
  styleUrl: './region-tooltip.component.scss'
})
export class RegionTooltipComponent {

  readonly selection: InputSignal<MapSelection> = input.required<MapSelection>();
  readonly characteristic: InputSignal<Characteristic> = input.required<Characteristic>();
  readonly value: Signal<CharacteristicSelection> = computed((): CharacteristicSelection =>
    regionAsCharacteristicSelection(this.characteristic(), this.selection().region));

  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;
  readonly Characteristic: typeof Characteristic = Characteristic;
}
