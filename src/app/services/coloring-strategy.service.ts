import { Injectable } from '@angular/core';
import { Characteristic } from '../dto/Map';
import { BehaviorSubject } from 'rxjs';
import { LegendRow } from '../shared/legend';

@Injectable({
  providedIn: 'root'
})
export class ColoringStrategyService {

  constructor() { }

  private currentColoringSubject = new BehaviorSubject<Characteristic>(Characteristic.REGION_TYPE);
  currentColoring$ = this.currentColoringSubject.asObservable();

  private highlightedCategorySubject = new BehaviorSubject<LegendRow | undefined>(undefined);
  highlightedCategory$ = this.highlightedCategorySubject.asObservable();

  setCurrentColoring(currentColoring: Characteristic) {
    this.currentColoringSubject.next(currentColoring);
    this.highlightedCategorySubject.next(undefined);
  }

  highlightCategory(row: LegendRow) {
    if (this.highlightedCategorySubject.value !== row) {
      this.highlightedCategorySubject.next(row);
    } else {
      this.highlightedCategorySubject.next(undefined);
    }
  }

}
