import { Injectable } from '@angular/core';
import { Province, Region, SubProvince } from '../dto/Map';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  private provinceSubject = new BehaviorSubject<Province | undefined>(undefined);
  province$ = this.provinceSubject.asObservable();

  private subProvinceSubject = new BehaviorSubject<SubProvince | undefined>(undefined);
  subProvince$ = this.subProvinceSubject.asObservable();

  private regionSubject = new BehaviorSubject<Region | undefined>(undefined);
  region$ = this.regionSubject.asObservable();

  setProvince(province: Province) {
    this.provinceSubject.next(province);
  }

  setSubProvince(subprovince: SubProvince) {
    this.subProvinceSubject.next(subprovince);
  }

  setRegion(region: Region) {
    this.regionSubject.next(region);
  }

}
