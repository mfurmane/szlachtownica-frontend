import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.coloringStrategyService.currentColoring$.subscribe((currentColoring: Characteristic) => {
      this.currentColoring = currentColoring;
    });
    this.coloringStrategyService.highlightedCategory$.subscribe((highlighted: LegendRow | undefined) => {
      this.highlighted = highlighted;
    });
  }

  private coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);

  currentColoring: Characteristic = Characteristic.REGION_TYPE;

  highlighted?: LegendRow;

  availableColorings: Array<Characteristic> = Object.values(Characteristic);

  characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

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
