import { h } from '../../utils/h';
import { UnlockSeedEvent } from '../base/events';
import { Openable } from '../base/openable';
import { Serialized, SerializedUnlocks } from '../base/serialized';
import { Plants } from './plants';

export class UnlocksWindow
  extends Openable
  implements Serialized<SerializedUnlocks>
{
  // Unlocked state
  public initialSeeds = 3;
  public unlocked: string[] = Object.keys(Plants).slice(0, this.initialSeeds);

  // UI elements
  protected closeBtn = h('button', ['button', 'button-close'], 'x');
  protected header = h(
    'div',
    ['unlocks-header'],
    [h('span', ['unlocks-header-text'], 'Unlock more seeds'), this.closeBtn]
  );
  protected body = h('div', ['unlocks-body']);
  protected box = h('div', ['unlocks-inner'], [this.header, this.body]);
  protected toggleBtn = h('button', ['button', 'button-toggle']);

  // Next seed price calculation variables
  public baseCost = 1000;
  public costFactor = 3.6942;

  constructor() {
    super('unlocks');
    this.closeBtn.addEventListener('click', () => this.close());
    this.toggleBtn.addEventListener('click', () => this.toggle());
    this.element.append(this.box, this.toggleBtn);
  }

  get purchaseCount() {
    return this.unlocked.length - this.initialSeeds;
  }

  get nextSeedCost() {
    return Math.ceil(
      this.baseCost * Math.pow(this.costFactor, this.purchaseCount)
    );
  }

  get nextUnlockable() {
    return Object.keys(Plants).slice(this.unlocked.length)[0];
  }

  update() {
    this.body.innerHTML = '';
    const { nextUnlockable, nextSeedCost } = this;
    if (!nextUnlockable) {
      this.body.appendChild(
        h('p', ['shop-message'], 'There are currently no more seeds to unlock!')
      );
      return;
    }

    const btn = h(
      'button',
      ['button', 'button-shop'],
      [
        h('span', ['button-shop-name'], nextUnlockable),
        h('span', ['button-shop-cost'], `${nextSeedCost} €`),
      ]
    );

    btn.addEventListener('click', () => {
      this.element.dispatchEvent(
        new UnlockSeedEvent({
          seed: nextUnlockable,
          cost: nextSeedCost,
        })
      );
    });

    this.body.appendChild(btn);
  }

  unlock(seed: string) {
    this.unlocked.push(seed);
    this.update();
  }

  serialize(): SerializedUnlocks {
    return {
      unlocked: this.unlocked,
    };
  }

  deserialize(pojo: SerializedUnlocks): void {
    if (!pojo?.unlocked) return;
    const allowedSeeds = Object.keys(Plants);
    this.unlocked = pojo.unlocked.filter((item) => allowedSeeds.includes(item));
  }
}
