import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColoringService } from '../../services/coloring.service';
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

  private readonly coloringService: ColoringService = inject(ColoringService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  currentColoring: Characteristic = Characteristic.REGION_TYPE;

  ngOnInit(): void {
    this.coloringService.currentColoring$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currentColoring: Characteristic) => {
      this.currentColoring = currentColoring;
    });
  }

  selectColoring(characteristic: Characteristic): void {
    this.coloringService.setCurrentColoring(characteristic);
  }

}
