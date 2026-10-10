import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { CHARACTERISTIC_LABELS } from '../../shared/legend';
import { Characteristic } from '../../shared/map';

@Component({
  selector: 'app-coloring-modes',
  standalone: true,
  imports: [],
  templateUrl: './coloring-modes.component.html',
  styleUrl: './coloring-modes.component.scss'
})
export class ColoringModesComponent implements OnInit {

  readonly availableColorings: Array<Characteristic> = Object.values(Characteristic);
  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

  private readonly coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  currentColoring: Characteristic = Characteristic.REGION_TYPE;

  ngOnInit(): void {
    this.coloringStrategyService.currentColoring$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currentColoring: Characteristic) => {
      this.currentColoring = currentColoring;
    });
  }

  setStrategy(characteristic: Characteristic): void {
    this.coloringStrategyService.setCurrentColoring(characteristic);
  }

}
