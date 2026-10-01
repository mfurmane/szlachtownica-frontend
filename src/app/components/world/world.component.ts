import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Province, Region, RegionType } from '../../dto/Map';
import { WindowService } from '../../services/window.service';
import type { Polygon } from 'geojson';

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
  colors: string[] = ["#000000", "#ff6f00", "#ffff00", "#00ddff", "#006eff", "#bf58ff", "#ff85fb", "#ff003c", "#6be075", "#3c5d9a", "#974b00", "#b6ac1e", "#03a8ae", "#00570d"];

    regionTypeColors: Record<RegionType, string> = {
      [RegionType.ABANDONED_REACH]: '#000000',
      [RegionType.CRAFTS_LAND]: '#993800',
      [RegionType.DUST_PLAIN]: '#e3e2b9',
      [RegionType.ESTATE_REGION]: '#880000',
      [RegionType.FARMING_LAND]: '#fffb00',
      [RegionType.FOREST]: '#197f00',
      [RegionType.IRON_MARCHES]: '#2a2a2a',
      [RegionType.MEADOWS]: '#00ff37',
      [RegionType.PINE_CRAG]: '#61ffc8',
      [RegionType.ROCK_LAND]: '#a1a1a1',
      [RegionType.SETTLERS_REACH]: '#ff871e',
      [RegionType.SUPERNATURAL_EXPANSE]: '#ff00d9',
      [RegionType.SWAMP]: '#1b2e00',
      [RegionType.TOURISTIC_LAND]: '#606eff'
    };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Province[]>('http://localhost:8080/world/provinces/all')
      .subscribe((data: Province[]) => {
        this.window.setProvince(data[0]);
        this.window.setSubProvince(data[0].subProvinces[0]);
        this.window.setRegion(data[0].subProvinces[0].regions[0]);
        this.provinces = data;
        this.setInitialViewBox();
      });
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

    const zoomFactor = 1.1;
    const scale = event.deltaY > 0 ? zoomFactor : 1 / zoomFactor;

    const mx = event.offsetX / 800; // mouse X (0–1)
    const my = event.offsetY / 600;

    this.viewBox.w *= scale;
    this.viewBox.h *= scale;

    this.viewBox.x += this.viewBox.w * (mx * (1 - scale));
    this.viewBox.y += this.viewBox.h * (my * (1 - scale));
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

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;

    const scaleX = this.viewBox.w / 800;
    const scaleY = this.viewBox.h / 600;

    this.viewBox.x -= dx * scaleX;
    this.viewBox.y -= dy * scaleY;

    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  endPan() {
    this.isPanning = false;
  }
}
