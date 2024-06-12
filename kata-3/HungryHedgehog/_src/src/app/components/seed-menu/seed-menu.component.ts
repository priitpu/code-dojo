import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plant } from '../../models';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-seed-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './seed-menu.component.html',
  styleUrl: './seed-menu.component.scss'
})
export class SeedMenuComponent {

  @Input() plants: Plant[] = [];
  @Output() seedPlanted = new EventEmitter<Plant>();

  game = inject(GameService);
  money = this.game.money$;

  plant(seed: Plant) {
    this.seedPlanted.emit(seed);
  }

}
