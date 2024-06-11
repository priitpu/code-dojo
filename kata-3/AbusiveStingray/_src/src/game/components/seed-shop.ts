import { h } from '../../utils/h';
import { Domie } from '../base/domie';
import { PlantEvent } from '../base/events';
import { Plants } from './plants';

export class SeedShop extends Domie {
  constructor() {
    super('shop');
  }

  update(plants: string[]) {
    this.element.innerHTML = '';
    for (const plant of plants) {
      const name = h('span', ['button-shop-name'], plant);
      const price = h('span', ['button-shop-cost'], `${Plants[plant].price} €`);
      const pic = h('div', ['button-shop-image']);
      const btn = h('button', ['button', 'button-shop'], [name, pic, price]);

      this.element.appendChild(btn);

      btn.addEventListener('click', () => {
        this.element.dispatchEvent(new PlantEvent({ plant }));
      });
    }
  }
}
