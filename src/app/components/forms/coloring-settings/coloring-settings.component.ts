import { Component, inject } from '@angular/core';
import { ColoringService } from '../../../services/coloring.service';
import { PaletteForm } from '../../../shared/coloring';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Characteristic } from '../../../shared/map';
import { CHARACTERISTIC_LABELS, LegendCategory, LEGENDS } from '../../../shared/legend';

@Component({
  selector: 'app-coloring-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './coloring-settings.component.html',
  styleUrl: './coloring-settings.component.scss'
})
export class ColoringSettingsComponent {

  private readonly coloringService: ColoringService = inject(ColoringService);

  readonly paletteForm: FormGroup<PaletteForm> = this.coloringService.paletteForm;

  readonly characteristics: Array<Characteristic> = Object.values(Characteristic);
  readonly legends: Record<Characteristic, LegendCategory> = LEGENDS;
  readonly characteristicLabels: Record<Characteristic, string> = CHARACTERISTIC_LABELS;

  reset(): void {
    this.paletteForm.reset();
  }

  save(): void {
    console.log('Zapisywanie konfiguracji kolorów zostanie dodane później');
  }

}
