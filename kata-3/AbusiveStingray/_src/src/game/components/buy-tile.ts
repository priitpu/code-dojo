import { h } from '../../utils/h';
import { Vec2Like } from '../../utils/vec2';
import { Domie } from '../base/domie';

/**
 * Virtual tile which represents a tile the player can purchase.
 */
export class BuyTile extends Domie implements Vec2Like {
  protected buy = h('span', ['tile-buy-title'], 'Expand');
  protected cost = h('span', ['tile-buy-cost'], '');

  constructor(public x: number, public y: number) {
    super('tile');
    this.element.classList.add('tile-buy');
    this.element.style.setProperty('--tile-pos-x', String(x));
    this.element.style.setProperty('--tile-pos-y', String(y));

    this.element.appendChild(this.buy);
    this.element.appendChild(this.cost);
  }

  setCost(cost: number) {
    this.cost.innerText = `${cost} €`;
  }
}
