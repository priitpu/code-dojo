import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SeedMenuComponent } from '../../components/seed-menu/seed-menu.component';
import { GameService } from '../../services/game.service';
import { PlantComponent } from '../../components/plant/plant.component';
import { Plant } from '../../models';

@Component({
  selector: 'app-plot',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, SeedMenuComponent, PlantComponent],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss'
})
export class PlotComponent {

  game = inject(GameService);

  seeds = this.game.plants$();
  beds = this.game.beds$();

  plantSeed(seed: Plant, idx: number): void {
    this.game.plantSeed(seed, idx);
  }

  harvestPlant(idx: number): void {
    this.game.harvestPlant(idx);
  }

}
