import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, ElementRef, OnInit, Signal, inject, viewChild } from '@angular/core';
import { Characteristic, Province } from '../../shared/map';
import { MapSelection, MapSelectionService } from '../../services/map-selection.service';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WorldStateService } from '../../services/world-state.service';
import { LegendComponent } from '../legend/legend.component';
import { ColoringModesComponent } from '../coloring-modes/coloring-modes.component';
import { delay, Observable, of, switchMap } from 'rxjs';
import { RegionTooltipComponent } from '../region-tooltip/region-tooltip.component';
import _ from 'lodash';
import { PointSearchLayerComponent } from '../layers/point-search-layer/point-search-layer.component';
import { PointSelectedLayerComponent } from '../layers/point-selected-layer/point-selected-layer.component';
import { PolygonSearchLayerComponent } from '../layers/polygon-search-layer/polygon-search-layer.component';
import { PolygonSelectedLayerComponent } from '../layers/polygon-selected-layer/polygon-selected-layer.component';
import { RegionsLayerComponent } from '../layers/regions-layer/regions-layer.component';
import { PlacesLayerComponent } from '../layers/places-layer/places-layer.component';

interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [LegendComponent, ColoringModesComponent, RegionTooltipComponent, AsyncPipe, PointSearchLayerComponent,
    PointSelectedLayerComponent, PolygonSearchLayerComponent, PolygonSelectedLayerComponent, RegionsLayerComponent, PlacesLayerComponent],
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})
export class WorldComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);
  private readonly worldStateService: WorldStateService = inject(WorldStateService);

  private readonly tooltipDelayMs: number = 500;

  readonly hovered$: Observable<MapSelection | undefined> = this.selectionService.hovered$.pipe(
    switchMap((value: MapSelection | undefined) => {
      if (_.isNil(value)) {
        return of(undefined);
      }
      return of(value).pipe(delay(this.tooltipDelayMs));
    }));
  readonly mapSvg: Signal<ElementRef<SVGSVGElement>> = viewChild.required<ElementRef<SVGSVGElement>>('map');
  readonly mapG: Signal<ElementRef<SVGGElement>> = viewChild.required<ElementRef<SVGGElement>>('mapG');

  viewBox: ViewBox = { x: 0, y: 0, w: 100, h: 100 };
  currentColoring: Characteristic = Characteristic.REGION_TYPE;
  cursorX: number = 0;
  cursorY: number = 0;

  private isPanning: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;

  ngOnInit(): void {
    this.worldStateService.provinces$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Array<Province>) => {
        this.viewBox = this.computeViewBox(data);
      });
    this.coloringStrategyService.currentColoring$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currentColoring: Characteristic) => {
        this.currentColoring = currentColoring;
      });
  }

  onMouseMove(e: MouseEvent): void {
    this.rememberCursorPosition(e);
    this.pan(e);
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

  private rememberCursorPosition(e: MouseEvent): void {
    const rect: DOMRect = this.mapSvg().nativeElement.getBoundingClientRect();
    this.cursorX = e.clientX - rect.left;
    this.cursorY = e.clientY - rect.top;
  }
}
