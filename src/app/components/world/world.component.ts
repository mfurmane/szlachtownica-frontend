import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Characteristic, Province, Region } from '../../dto/Map';
import { WindowService } from '../../services/window.service';
import type { Polygon } from 'geojson';
import _ from 'lodash';
import { ColoringStrategyService } from '../../services/coloring-strategy.service';
import { LegendRow, LEGENDS } from '../../shared/legend';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})

export class WorldComponent implements OnInit {
  provinces: Province[] = [];
  viewBox = { x: 0, y: 0, w: 100, h: 100 };
  window: WindowService = inject(WindowService);
  coloringStrategyService: ColoringStrategyService = inject(ColoringStrategyService);
  readonly highlightedColor: string = '#ffff00';
  readonly unhighlightedColor: string = '#292918';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Province[]>('http://localhost:8080/world/provinces/all')
      .subscribe((data: Province[]) => {
        this.provinces = data;
        this.setInitialViewBox();
      });
    this.coloringStrategyService.currentColoring$.subscribe((currentColoring: Characteristic) => {
      this.currentColoring = currentColoring;
    })
    this.coloringStrategyService.highlightedCategory$.subscribe((highlighted: LegendRow | undefined) => {
      this.highlighted = highlighted;
    })
  }

  highlighted?: LegendRow;
  currentColoring: Characteristic = Characteristic.REGION_TYPE;

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

  onRegionClick(region: Region, province: Province) {
    this.window.setRegion(region);
    this.window.setProvince(province);
  }

  toPath(geometry: Polygon): string {
    if (geometry.type === 'Polygon') {
      return geometry.coordinates
        .map((ring: number[][]) =>
          ring.map((point, i) =>
            (i === 0 ? 'M' : 'L') + point[0] + ' ' + (point[1])
          ).join(' ') + ' Z'
        )
        .join(' ');
    }
    return '';
  }

  setInitialViewBox() {
    const vb = this.getViewBox().split(' ').map(Number);
    this.viewBox = { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
  }

  getViewBox(): string {
    const points = this.provinces.flatMap(p =>
      p.area.coordinates.flat()
    );

    const xs = points.map(p => p[0]);
    const ys = points.map(p => p[1]);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const padding = 1;

    return `${minX - padding} ${-maxY - padding} ${maxX - minX + 2 * padding} ${maxY - minY + 2 * padding}`;
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();

    const svg = event.currentTarget as SVGSVGElement;
    const ctm = svg.getScreenCTM();
    if (_.isNil(ctm)) {
      return;
    }

    const zoomFactor = 1.1;
    const scale = event.deltaY > 0 ? zoomFactor : 1 / zoomFactor;

    // punkt mapy pod kursorem, we współrzędnych viewBoxa
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());

    // ten punkt ma zostać pod kursorem po zmianie skali
    this.viewBox.x = p.x - (p.x - this.viewBox.x) * scale;
    this.viewBox.y = p.y - (p.y - this.viewBox.y) * scale;
    this.viewBox.w *= scale;
    this.viewBox.h *= scale;
  }

  isPanning = false;
  lastX = 0;
  lastY = 0;

  startPan(e: MouseEvent) {
    this.isPanning = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  onPan(e: MouseEvent) {
    if (!this.isPanning) return;

    const svg = e.currentTarget as SVGSVGElement;
    const ctm = svg.getScreenCTM();
    if (_.isNil(ctm)) {
      return;
    }

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;

    // ctm to liczba pikseli ekranu na jednostkę mapy
    this.viewBox.x -= dx / ctm.a;
    this.viewBox.y -= dy / ctm.d;

    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  endPan() {
    this.isPanning = false;
  }
}
