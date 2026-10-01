import { Component } from '@angular/core';
import { WorldComponent } from './components/world/world.component';
import { WindowComponent } from './components/window/window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldComponent, WindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'szlachtownica-frontend';
}
