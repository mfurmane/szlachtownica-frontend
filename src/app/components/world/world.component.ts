import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, ElementRef, OnInit, Signal, inject, viewChild } from '@angular/core';
import { allPlaces, allRegions, Characteristic, ExtendedPlace, Place, Province, Region } from '../../shared/map';
import { MapSelection, MapSelectionService } from '../../services/map-selection.service';
import type { Polygon } from 'geojson';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { LegendRow, LEGENDS } from '../../shared/legend';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WorldStateService } from '../../services/world-state.service';
import { LegendComponent } from '../legend/legend.component';
import { ColoringModesComponent } from '../coloring-modes/coloring-modes.component';
import { delay, Observable, of, switchMap } from 'rxjs';
import { RegionTooltipComponent } from '../region-tooltip/region-tooltip.component';
import _ from 'lodash';
import { onlyType, ResultType, SearchResult } from '../../shared/search';
import { SearchService } from '../../services/search.service';

interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [LegendComponent, ColoringModesComponent, RegionTooltipComponent, AsyncPipe],
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})
export class WorldComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);
  private readonly worldStateService: WorldStateService = inject(WorldStateService);
  private readonly searchService: SearchService = inject(SearchService);

  private readonly highlightedColor: string = '#ffff00';
  private readonly unhighlightedColor: string = '#292918';
  private readonly tooltipDelayMs: number = 500;

  readonly ResultType: typeof ResultType = ResultType;
  readonly placeResults$: Observable<Array<SearchResult>> = this.searchService.results$.pipe(onlyType(ResultType.PLACE));
  readonly provinceResults$: Observable<Array<SearchResult>> = this.searchService.results$.pipe(onlyType(ResultType.PROVINCE));

  readonly hovered$: Observable<MapSelection | undefined> = this.selectionService.hovered$.pipe(
    switchMap((value: MapSelection | undefined) => {
      if (_.isNil(value)) {
        return of(undefined);
      }
      return of(value).pipe(delay(this.tooltipDelayMs));
    }));
  readonly mapSvg: Signal<ElementRef<SVGSVGElement>> = viewChild.required<ElementRef<SVGSVGElement>>('map');
  readonly mapG: Signal<ElementRef<SVGGElement>> = viewChild.required<ElementRef<SVGGElement>>('mapG');

  paths: Map<number, string> = new Map<number, string>();
  provincePaths: Map<number, string> = new Map<number, string>();
  places: Array<ExtendedPlace> = [];
  provinces: Array<Province> = [];
  viewBox: ViewBox = { x: 0, y: 0, w: 100, h: 100 };
  currentColoring: Characteristic = Characteristic.REGION_TYPE;
  selectedRegion?: Region;
  selectedPlace?: Place;
  cursorX: number = 0;
  cursorY: number = 0;

  private highlighted?: LegendRow;

  private isPanning: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;

  ngOnInit(): void {
    this.worldStateService.provinces$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Array<Province>) => {
        this.provinces = data;
        this.places = allPlaces(data);
        this.paths = this.preparePaths(data);
        this.provincePaths = this.prepareProvincePaths(data);
        this.viewBox = this.computeViewBox(data);
      });
    this.coloringStrategyService.currentColoring$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currentColoring: Characteristic) => {
        this.currentColoring = currentColoring;
      });
    this.coloringStrategyService.highlightedCategory$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((highlighted: LegendRow | undefined) => {
        this.highlighted = highlighted;
      });
    this.selectionService.selection$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selection: MapSelection | undefined) => {
        if (_.isNil(selection?.place)) {
          this.selectedRegion = selection?.region;
          this.selectedPlace = undefined;
        } else {
          this.selectedPlace = selection.place;
          this.selectedRegion = undefined;
        }
      });
  }

  onMouseMove(e: MouseEvent): void {
    this.rememberCursorPosition(e);
    this.pan(e);
  }

  getColor(region: Region): string {
    if (!_.isNil(this.highlighted)) {
      if (this.highlighted.matches(region)) {
        return this.highlightedColor;
      } else {
        return this.unhighlightedColor;
      }
    }
    return LEGENDS[this.currentColoring].colorPicker(region);
  }

  onRegionClick(region: Region, province: Province): void {
    this.selectionService.setSelection({ region, province });
  }

  onRegionEnter(region: Region, province: Province): void {
    this.selectionService.setHovered({ region, province });
  }

  onPlaceClick(mapSelection: MapSelection): void {
    this.selectionService.setSelection(mapSelection);
  }

  onPlaceEnter(extendedPlace: ExtendedPlace): void {
    this.selectionService.setHovered(extendedPlace);
  }

  onElementLeave(): void {
    this.selectionService.clearHovered();
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();

    const svg: SVGSVGElement = this.mapSvg().nativeElement;

    const zoomFactor: number = 1.1;
    const scale: number = event.deltaY > 0 ? zoomFactor : 1 / zoomFactor;

    // punkt mapy pod kursorem, we współrzędnych viewBoxa
    const p: DOMPoint | undefined = this.toLocalPoint(event.clientX, event.clientY, svg);
    if (_.isNil(p)) {
      return;
    }

    // ten punkt ma zostać pod kursorem po zmianie skali
    this.viewBox.x = p.x - (p.x - this.viewBox.x) * scale;
    this.viewBox.y = p.y - (p.y - this.viewBox.y) * scale;
    this.viewBox.w *= scale;
    this.viewBox.h *= scale;
  }

  startPan(e: MouseEvent): void {
    this.isPanning = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  endPan(): void {
    this.isPanning = false;
  }

  onMapClick(event: MouseEvent): void {
    if (event.altKey) {
      const g: SVGGElement = this.mapG().nativeElement;
      const p: DOMPoint | undefined = this.toLocalPoint(event.clientX, event.clientY, g);
      if (_.isNil(p)) {
        return;
      }
      const coordinateText: string = `new Coordinate(${p.x}, ${p.y})`;
      navigator.clipboard.writeText(coordinateText)
        .catch(() => {
          console.warn('Nie udało się skopiować koordynatów');
        });
      console.log(coordinateText);
    }
  }

  private toLocalPoint(clientX: number, clientY: number, element: SVGGraphicsElement): DOMPoint | undefined {
    const ctm: DOMMatrix | null = element.getScreenCTM();
    if (_.isNil(ctm)) {
      return undefined;
    }
    return new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
  }

  private computeViewBox(provinces: Array<Province>): ViewBox {
    const points: Array<Array<number>> = provinces.flatMap((p: Province) =>
      p.area.coordinates.flat()
    );

    const xs: Array<number> = points.map((p: Array<number>) => p[0]);
    const ys: Array<number> = points.map((p: Array<number>) => p[1]);

    const minX: number = Math.min(...xs);
    const maxX: number = Math.max(...xs);
    const minY: number = Math.min(...ys);
    const maxY: number = Math.max(...ys);

    const padding: number = 1;

    return {
      x: minX - padding,
      y: -maxY - padding,
      w: maxX - minX + 2 * padding,
      h: maxY - minY + 2 * padding
    };
  }

  private pan(e: MouseEvent): void {
    if (!this.isPanning) return;

    const svg: SVGSVGElement = this.mapSvg().nativeElement;
    const ctm: DOMMatrix | null = svg.getScreenCTM();
    if (_.isNil(ctm)) {
      return;
    }

    const dx: number = e.clientX - this.lastX;
    const dy: number = e.clientY - this.lastY;

    // ctm to liczba pikseli ekranu na jednostkę mapy
    this.viewBox.x -= dx / ctm.a;
    this.viewBox.y -= dy / ctm.d;

    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  private toPath(geometry: Polygon): string {
    if (geometry.type === 'Polygon') {
      return geometry.coordinates
        .map((ring: Array<Array<number>>) =>
          ring.map((point: Array<number>, i: number) =>
            (i === 0 ? 'M' : 'L') + point[0] + ' ' + (point[1])
          ).join(' ') + ' Z'
        )
        .join(' ');
    }
    return '';
  }

  private rememberCursorPosition(e: MouseEvent): void {
    const rect: DOMRect = this.mapSvg().nativeElement.getBoundingClientRect();
    this.cursorX = e.clientX - rect.left;
    this.cursorY = e.clientY - rect.top;
  }

  private preparePaths(provinces: Array<Province>): Map<number, string> {
    const result: Map<number, string> = new Map<number, string>();
    allRegions(provinces).forEach((region: Region) => {
      result.set(region.id, this.toPath(region.area));
    });
    return result;
  }

  private prepareProvincePaths(provinces: Array<Province>): Map<number, string> {
    const result: Map<number, string> = new Map<number, string>();
    provinces.forEach((province: Province) => {
      result.set(province.id, this.toPath(province.area));
    });
    return result;
  }
}
