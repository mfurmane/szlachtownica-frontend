import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Characteristic, Region } from '../../dto/Map';
import { CHARACTERISTIC_LABELS, CharacteristicSelection, regionAsCharacteristicSelection } from '../../shared/legend';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.scss'
})
export class RegionDetailsComponent implements OnChanges {
  @Input({ required: true }) region!: Region;
  @Output() characteristicSelected: EventEmitter<CharacteristicSelection> = new EventEmitter<CharacteristicSelection>();

  values: Array<CharacteristicSelection> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['region']) {
      this.values = Object.values(Characteristic)
      .map((characteristic: Characteristic) => 
        regionAsCharacteristicSelection(characteristic, this.region)
      );
    }
  }

  characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

}
