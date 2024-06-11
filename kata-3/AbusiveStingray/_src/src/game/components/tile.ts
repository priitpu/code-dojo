import { h } from '../../utils/h';
import { Vec2Like } from '../../utils/vec2';
import { Domie } from '../base/domie';
import { Plant, Plants } from './plants';
import { ProgressCircle } from './progress-circle';
import { Serialized, SerializedTile } from '../base/serialized';
import { StateMachine } from '../base/state-machine';
import { Tickable } from '../base/tickable';
import { useSetDistinct } from '../../utils/distinct';
import { secondsToHMS } from '../../utils/time';

export class Tile
  extends Domie
  implements Tickable, Vec2Like, Serialized<SerializedTile>
{
  /**
   * Current plant on this tile.
   */
  public currentPlant?: Plant;

  // Tile inner elements
  protected progress = new ProgressCircle(20, 4);
  protected timer = h('div', ['tile-timer'], '');
  protected image = h('img', ['tile-picture'], undefined, {
    attr: { draggable: 'false' },
  });
  protected payout = h('span', ['tile-payout'], '');

  // Prevent updating the DOM every tick unnecessarily.
  private setTime = useSetDistinct((time) => {
    this.timer.innerHTML = time;
  }, '');

  private setPayout = useSetDistinct((payout) => {
    this.payout.innerText = payout;
  }, '');

  private setPicture = useSetDistinct((src) => {
    this.image.src = src;
  }, '');

  // This is mainly an experiment, it's probably not used correctly.
  // ...and probably not even necessary in the first place.
  public state = new StateMachine(
    {
      dirt: {
        actions: {
          onEnter: () => {
            this.element.classList.add('tile-dirt');
          },
          onLeave: () => {
            this.element.classList.remove('tile-dirt');
          },
        },
        transitions: {
          plant: {
            target: 'growing',
            action: (name: string) => {
              this.currentPlant = new Plants[name]();
            },
          },
        },
      },
      growing: {
        actions: {
          onEnter: () => {
            this.element.classList.add('tile-growing');
          },
          onLeave: () => {
            this.element.classList.remove('tile-growing');
            this.progress.setProgress(0);
            this.updateTimer();
            this.updatePayout();
          },
        },
        transitions: {
          clear: {
            target: 'dirt',
            action: () => {
              this.currentPlant = undefined;
            },
          },
          finish: {
            target: 'ready',
            action: () => {},
          },
        },
      },
      ready: {
        actions: {
          onEnter: () => {
            this.element.classList.add('tile-ready');
            this.progress.setProgress(100);
            this.updateTimer();
            this.updatePayout();
            this.updatePicture();
          },
          onLeave: () => {
            this.currentPlant = undefined;
            this.element.classList.remove('tile-ready');
            this.progress.setProgress(0);
            this.updateTimer();
            this.updatePayout();
            this.updatePicture();
          },
        },
        transitions: {
          harvest: {
            target: 'dirt',
            action: () => {},
          },
        },
      },
    },
    'dirt'
  );

  constructor(public x: number, public y: number) {
    super('tile');
    this.setup();
  }

  plant(name: string) {
    if (this.currentPlant || this.state.value !== 'dirt') return;
    this.state.transition('dirt', 'plant', name);
  }

  harvest() {
    if (!this.currentPlant || this.state.value !== 'ready') return;
    const harvested = this.currentPlant;
    this.state.transition('ready', 'harvest');
    return harvested;
  }

  tick(time: number) {
    if (!this.currentPlant || this.state.value === 'ready') return;
    this.currentPlant.tick(time);

    if (this.currentPlant.ready) {
      this.state.transition('growing', 'finish');
    }

    this.progress.setProgress(this.currentPlant.percentage);
    this.updateTimer();
    this.updatePayout();
    this.updatePicture();
  }

  deserialize(pojo: SerializedTile): void {
    if (pojo.plant) {
      this.currentPlant = new Plants[pojo.plant.plant]();
      this.currentPlant.deserialize(pojo.plant);
    }

    if (pojo.state && pojo.state !== 'dirt') {
      this.state.change('dirt', pojo.state as 'ready' | 'growing');
    }
  }

  serialize(): SerializedTile {
    return {
      xy: [this.x, this.y],
      plant: this.currentPlant?.serialize(),
      state: this.state.value !== 'dirt' ? this.state.value : undefined,
    };
  }

  protected updateTimer() {
    if (!this.currentPlant) {
      this.setTime('');
      return;
    }

    this.setTime(
      this.currentPlant.timeLeft
        ? `${secondsToHMS(Math.ceil(this.currentPlant.timeLeft))}`
        : 'Ready!'
    );
  }

  protected updatePayout() {
    if (!this.currentPlant?.ready) {
      this.setPayout('');
      return;
    }

    this.setPayout(`+${this.currentPlant.sellPrice} €`);
  }

  protected updatePicture() {
    if (!this.currentPlant) {
      this.setPicture('');
      return;
    }

    this.setPicture(
      `/assets/plants/${this.currentPlant.name}/${this.currentPlant.stage}.png`
    );
  }

  protected setup() {
    this.element.classList.add('tile-dirt');
    this.element.style.setProperty('--tile-pos-x', String(this.x));
    this.element.style.setProperty('--tile-pos-y', String(this.y));
    this.progress.mount(this);
    this.progress.element.appendChild(this.timer);
    this.element.appendChild(this.image);
    this.element.appendChild(this.payout);
  }
}
