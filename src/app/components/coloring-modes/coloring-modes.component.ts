import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ColoringService } from '../../services/coloring.service';
import { CHARACTERISTIC_LABELS } from '../../shared/legend';
import { Characteristic } from '../../shared/map';

@Component({
  selector: 'app-coloring-modes',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coloring-modes.component.html',
  styleUrl: './coloring-modes.component.scss'
})
export class ColoringModesComponent {

  readonly availableColorings: Array<Characteristic> = Object.values(Characteristic);
  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

  private readonly coloringService: ColoringService = inject(ColoringService);

  readonly currentColoring: Signal<Characteristic> = this.coloringService.currentColoring;

  selectColoring(characteristic: Characteristic): void {
    this.coloringService.setCurrentColoring(characteristic);
  }

}
