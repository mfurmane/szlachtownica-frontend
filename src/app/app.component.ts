import { Component, inject } from '@angular/core';
import { WorldComponent } from './components/world/world.component';
import { WindowComponent } from './components/window/window.component';
import { KeyboardService } from './services/keyboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldComponent, WindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //Ten serwis inaczej nie powstaje, coś musi go wstrzykiwać, żeby skróty klawiszowe działały
  private readonly keyboardService: KeyboardService = inject(KeyboardService);
}
