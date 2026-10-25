import { Component, inject } from '@angular/core';
import { WorldComponent } from './components/world/world.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { KeyboardService } from './services/keyboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldComponent, SidePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //Ten serwis inaczej nie powstaje, coś musi go wstrzykiwać, żeby skróty klawiszowe działały
  private readonly keyboardService: KeyboardService = inject(KeyboardService);
}
