import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HudComponent } from './containers/hud/hud.component';
import { PlotComponent } from './containers/plot/plot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HudComponent, PlotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RevengeOfTheFarmer';
}
