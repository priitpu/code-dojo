import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [],
  templateUrl: './hud.component.html',
  styleUrl: './hud.component.scss'
})
export class HudComponent {

  game = inject(GameService);
  money = this.game.money$;

}
