import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacteristicSelection } from '../../shared/legend';
import { Characteristic, Climate, EnchantType, Humidity, MapSelection, PlaceType, Region, RegionType, SoilType, TerrainShape } from '../../shared/map';
import { createPlace, createProvince, createRegion } from '../../testing/test-data';
import { SelectionDetailsComponent } from './selection-details.component';

describe('SelectionDetailsComponent', () => {
  let fixture: ComponentFixture<SelectionDetailsComponent>;
  const expectedValues: Record<Characteristic, string> = {
    [Characteristic.REGION_TYPE]: RegionType.FOREST,
    [Characteristic.HUMIDITY]: Humidity.WET,
    [Characteristic.CLIMATE]: Climate.COLD,
    [Characteristic.TERRAIN_SHAPE]: TerrainShape.FLATLANDS,
    [Characteristic.SOIL]: SoilType.FERTILE,
    [Characteristic.ENCHANT]: EnchantType.NONE
  };
  const region: Region = createRegion({
    type: RegionType.FOREST,
    humidity: Humidity.WET,
    climate: Climate.COLD,
    terrainShape: TerrainShape.FLATLANDS,
    soilType: SoilType.FERTILE,
    enchant: EnchantType.NONE
  });
  const characteristics: Array<Characteristic> = Object.values(Characteristic);

  function render(selection: MapSelection): HTMLElement {
    fixture.componentRef.setInput('selection', selection);
    fixture.detectChanges();

    return fixture.nativeElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SelectionDetailsComponent] });
    fixture = TestBed.createComponent(SelectionDetailsComponent);
  });

  it('dla zaznaczonego miasta pokazuje jego nazwę, typ i prowincję', () => {
    const selection: MapSelection = {
      region: createRegion(),
      province: createProvince({ name: 'Merinia' }),
      place: createPlace({ name: 'Gilgamore', type: PlaceType.SETTLEMENT })
    };

    const element: HTMLElement = render(selection);
    expect(element.querySelector('h3')?.textContent).toBe('Gilgamore');
    expect(element.querySelector('.subtitle')?.textContent).toBe('Miasto · Merinia');
  });

  it('dla zaznaczonego regionu pokazuje jego numer i prowincję', () => {
    const selection: MapSelection = {
      region: createRegion({ id: 106850 }),
      province: createProvince({ name: 'Merinia' })
    };

    const element: HTMLElement = render(selection);
    expect(element.querySelector('h3')?.textContent).toBe('Region 106850');
    expect(element.querySelector('.subtitle')?.textContent).toBe('Prowincja Merinia');
  });

  characteristics.forEach((characteristic: Characteristic, index: number) => {
    it(`kliknięcie w cechę ${characteristic} emituje tę cechę`, () => {
      const selection: MapSelection = {
        region,
        province: createProvince()
      };
      const element: HTMLElement = render(selection);
      const spy: jasmine.Spy<(value: CharacteristicSelection) => void> = jasmine.createSpy('characteristicSelected');
      fixture.componentInstance.characteristicSelected.subscribe(spy);
      element.querySelectorAll<HTMLButtonElement>('dd button')[index]?.click();

      expect(spy).toHaveBeenCalledTimes(1);
      const emitted: CharacteristicSelection = spy.calls.mostRecent().args[0];
      expect(emitted.characteristic).toBe(characteristic);
      expect(emitted.row.value).toBe(expectedValues[characteristic]);
    });
  });
});
