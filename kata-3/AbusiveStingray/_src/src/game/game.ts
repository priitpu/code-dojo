import { toFixedNumber } from '../utils/math';
import { Domie } from './base/domie';
import { Field } from './components/field';
import { Hud } from './components/hud';
import { Plants } from './components/plants';
import { SeedShop } from './components/seed-shop';
import { Serialized, SerializedGame } from './base/serialized';
import { Tooltip } from './components/tooltip';
import { UnlocksWindow } from './components/unlocks';

export class Game extends Domie implements Serialized<SerializedGame> {
  // Game components
  protected field = new Field();
  protected tooltip = new Tooltip();
  protected shop = new SeedShop();
  protected unlocks = new UnlocksWindow();
  protected hud = new Hud();

  // Game variables
  protected moneyCount = 90;

  // Frame time counters
  private lastTime!: number;
  private targetUps = 1000 / 30;
  private running = false;

  // Money setter updates the HUD
  public set money(amount: number) {
    const rounded = toFixedNumber(amount);
    this.moneyCount = rounded;
    this.hud.update(rounded);
  }

  public get money() {
    return this.moneyCount;
  }

  constructor() {
    super('game');

    this.loop = this.loop.bind(this);

    // Set up components
    this.field.mount(this);
    this.tooltip.mount(this.field);
    this.hud.mount(this);
    this.unlocks.mount(this);

    this.hud.update(this.money);

    this.listen();
  }

  async preload() {
    await this.field.preload();
  }

  start() {
    this.running = true;
    this.loop(0);
    this.field.center();
    this.field.showBuyables();
    this.shop.update(this.unlocks.unlocked);
    this.unlocks.update();
    return this;
  }

  stop() {
    this.running = false;
  }

  deserialize(pojo: SerializedGame) {
    this.money = pojo.money;
    this.field.deserialize(pojo.field);
    this.unlocks.deserialize(pojo.unlocks);
  }

  serialize(): SerializedGame {
    return {
      money: this.money,
      field: this.field.serialize(),
      unlocks: this.unlocks.serialize(),
    };
  }

  private listen() {
    this.field.element.addEventListener(
      'tileselect',
      ({ detail: { tile } }) => {
        // Open shop
        if (tile.state.value === 'dirt') {
          this.tooltip.open(tile.x, tile.y, this.shop);
        }

        // Harvest crop
        if (tile.state.value === 'ready') {
          const result = this.field.activeTile?.harvest();
          if (result) {
            this.money += result.sellPrice;
          }
        }
      }
    );

    // Deselect, close open menus
    this.field.element.addEventListener('tiledeselect', () => {
      this.tooltip.close();
    });

    this.field.element.addEventListener(
      'buytile',
      ({ detail: { pos, cost } }) => {
        if (this.money < cost) return;
        this.money -= cost;
        this.field.addTile(pos);
      }
    );

    // Buy seed for current tile
    this.shop.element.addEventListener('plant', ({ detail: { plant } }) => {
      if (!this.field.activeTile) return;
      const price = Plants[plant].price;

      if (this.money < price) return;
      this.money -= price;
      this.field.activeTile?.plant(plant);
      this.tooltip.close();
    });

    this.hud.element.addEventListener('hudtoggle', () => this.unlocks.toggle());

    this.unlocks.element.addEventListener(
      'unlockseed',
      ({ detail: { seed, cost } }) => {
        if (this.money < cost) return;
        this.money -= cost;
        this.unlocks.unlock(seed);
        this.shop.update(this.unlocks.unlocked);
      }
    );
  }

  private loop(now: number) {
    if (!this.running) return;
    requestAnimationFrame(this.loop);

    if (!this.lastTime) {
      this.lastTime = now;
    }

    const delta = now - this.lastTime;
    if (delta > this.targetUps) {
      // Update components
      const dts = delta / 1000;
      this.field.tick(dts);
      this.unlocks.tick(dts);
      this.lastTime = now;
    }
  }
}
