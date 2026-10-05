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

  ngOnInit() {
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

  availableColorings: Array<Characteristic> = [
    Characteristic.REGION_TYPE, 
    Characteristic.CLIMATE, 
    Characteristic.HUMIDITY, 
    Characteristic.TERRAIN_SHAPE, 
    Characteristic.SOIL, 
    Characteristic.ENCHANT
  ]

  characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

  getLegend(): LegendCategory {
    return LEGENDS[this.currentColoring];
  }

  setStrategy(characteristic: Characteristic) {
    this.coloringStrategyService.setCurrentColoring(characteristic);
  }

  highlightCategory(row: LegendRow) {
    this.coloringStrategyService.highlightCategory(row);
  }

}
