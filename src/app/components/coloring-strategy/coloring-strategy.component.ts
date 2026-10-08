import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Characteristic } from '../../dto/Map';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { CHARACTERISTIC_LABELS, LegendCategory, LegendRow, LEGENDS } from '../../shared/legend';

@Component({
  selector: 'app-coloring-strategy',
  standalone: true,
  imports: [],
  templateUrl: './coloring-strategy.component.html',
  styleUrl: './coloring-strategy.component.scss'
})
export class ColoringStrategyComponent implements OnInit {

  readonly availableColorings: Array<Characteristic> = Object.values(Characteristic);
  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

  private readonly coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  currentColoring: Characteristic = Characteristic.REGION_TYPE;
  highlighted?: LegendRow;

  ngOnInit(): void {
    this.coloringStrategyService.currentColoring$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currentColoring: Characteristic) => {
      this.currentColoring = currentColoring;
    });
    this.coloringStrategyService.highlightedCategory$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((highlighted: LegendRow | undefined) => {
      this.highlighted = highlighted;
    });
  }

  getLegend(): LegendCategory {
    return LEGENDS[this.currentColoring];
  }

  setStrategy(characteristic: Characteristic): void {
    this.coloringStrategyService.setCurrentColoring(characteristic);
  }

  highlightCategory(row: LegendRow): void {
    this.coloringStrategyService.highlightCategory(row);
  }

}
