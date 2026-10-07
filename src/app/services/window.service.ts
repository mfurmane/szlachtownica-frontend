import { Injectable } from '@angular/core';
import { Province, Region, SubProvince } from '../dto/Map';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor() { }

  private provinceSubject: BehaviorSubject<Province | undefined> = new BehaviorSubject<Province | undefined>(undefined);
  province$: Observable<Province | undefined> = this.provinceSubject.asObservable();

  private subProvinceSubject: BehaviorSubject<SubProvince | undefined> = new BehaviorSubject<SubProvince | undefined>(undefined);
  subProvince$: Observable<SubProvince | undefined> = this.subProvinceSubject.asObservable();

  private regionSubject: BehaviorSubject<Region | undefined> = new BehaviorSubject<Region | undefined>(undefined);
  region$: Observable<Region | undefined> = this.regionSubject.asObservable();

  setProvince(province: Province): void {
    this.provinceSubject.next(province);
  }

  setSubProvince(subprovince: SubProvince): void {
    this.subProvinceSubject.next(subprovince);
  }

  setRegion(region: Region): void {
    this.regionSubject.next(region);
  }

}
