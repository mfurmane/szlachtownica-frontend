import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Characteristic, Province, Region, SubProvince } from '../../dto/Map';
import { MapSelectionService } from '../../services/map-selection.service';
import type { Polygon } from 'geojson';
import _ from 'lodash';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { LegendRow, LEGENDS } from '../../shared/legend';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})
export class WorldComponent implements OnInit {

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly selectionService: MapSelectionService = inject(MapSelectionService);
  private readonly coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);

  private readonly highlightedColor: string = '#ffff00';
  private readonly unhighlightedColor: string = '#292918';

  paths: Map<number, string> = new Map<number, string>();
  provinces: Province[] = [];
  viewBox: ViewBox = { x: 0, y: 0, w: 100, h: 100 };

  private highlighted?: LegendRow;
  private currentColoring: Characteristic = Characteristic.REGION_TYPE;

  private isPanning: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;

  ngOnInit(): void {
    this.http.get<Province[]>('http://localhost:8080/world/provinces/all')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Province[]) => {
        this.provinces = data;
        this.paths = this.preparePaths(data);
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

  onWheel(event: WheelEvent): void {
    event.preventDefault();

    const svg: SVGSVGElement = event.currentTarget as SVGSVGElement;
    const ctm: DOMMatrix | null = svg.getScreenCTM();
    if (_.isNil(ctm)) {
      return;
    }

    const zoomFactor: number = 1.1;
    const scale: number = event.deltaY > 0 ? zoomFactor : 1 / zoomFactor;

    // punkt mapy pod kursorem, we współrzędnych viewBoxa
    const p: DOMPoint = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());

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

  onPan(e: MouseEvent): void {
    if (!this.isPanning) return;

    const svg: SVGSVGElement = e.currentTarget as SVGSVGElement;
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

  endPan(): void {
    this.isPanning = false;
  }

  private computeViewBox(provinces: Province[]): ViewBox {
    const points: number[][] = provinces.flatMap((p: Province) =>
      p.area.coordinates.flat()
    );

    const xs: number[] = points.map((p: number[]) => p[0]);
    const ys: number[] = points.map((p: number[]) => p[1]);

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

  private toPath(geometry: Polygon): string {
    if (geometry.type === 'Polygon') {
      return geometry.coordinates
        .map((ring: number[][]) =>
          ring.map((point: number[], i: number) =>
            (i === 0 ? 'M' : 'L') + point[0] + ' ' + (point[1])
          ).join(' ') + ' Z'
        )
        .join(' ');
    }
    return '';
  }

  private preparePaths(provinces: Province[]): Map<number, string> {
    const result: Map<number, string> = new Map<number, string>();
    provinces.forEach((province: Province) => {
      province.subProvinces.forEach((subProvince: SubProvince) => {
        subProvince.regions.forEach((region: Region) => {
          result.set(region.id, this.toPath(region.area));
        });
      });
    });
    return result;
  }
}
