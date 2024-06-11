import { h } from '../../utils/h';
import { WrappedDomie } from '../base/domie';

export class Hud extends WrappedDomie {
  protected moneyText = h('span', ['hud-money'], '0 €');
  protected moneySign = h('div', ['hud-money-wrapper'], [this.moneyText]);

  constructor() {
    super('hud');
    this.element.append(this.moneySign);
  }

  update(money: number) {
    this.moneyText.innerText = `${money} €`;
  }
}
