import { Injectable } from '@angular/core';
import { Characteristic } from '../dto/Map';
import { BehaviorSubject, Observable } from 'rxjs';
import { LegendRow } from '../shared/legend';

@Injectable({
  providedIn: 'root'
})
export class ColoringStrategyService {

  constructor() { }

  private currentColoringSubject: BehaviorSubject<Characteristic> = new BehaviorSubject<Characteristic>(Characteristic.REGION_TYPE);
  currentColoring$: Observable<Characteristic> = this.currentColoringSubject.asObservable();

  private highlightedCategorySubject: BehaviorSubject<LegendRow | undefined> = new BehaviorSubject<LegendRow | undefined>(undefined);
  highlightedCategory$: Observable<LegendRow | undefined> = this.highlightedCategorySubject.asObservable();

  setCurrentColoring(currentColoring: Characteristic): void {
    this.currentColoringSubject.next(currentColoring);
    this.highlightedCategorySubject.next(undefined);
  }

  highlightCategory(row: LegendRow): void {
    if (this.highlightedCategorySubject.value !== row) {
      this.highlightedCategorySubject.next(row);
    } else {
      this.highlightedCategorySubject.next(undefined);
    }
  }

  showCategory(characteristic: Characteristic, row: LegendRow): void {
    this.setCurrentColoring(characteristic);
    this.highlightCategory(row);
  }

}
