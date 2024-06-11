import { WrappedDomie } from './domie';
import { StateMachine } from './state-machine';
import { Tickable } from './tickable';

export class Openable extends WrappedDomie implements Tickable {
  protected time = 0;
  protected state = new StateMachine(
    {
      closed: {
        actions: {
          onEnter: () => this.wrapper.classList.add('is-closed'),
          onLeave: () => this.wrapper.classList.remove('is-closed'),
        },
        transitions: {
          open: {
            target: 'opening',
            action: () => {
              this.time = this.transitionTime;
            },
          },
        },
      },
      opening: {
        actions: {
          onEnter: () => this.wrapper.classList.add('is-opening', 'is-open'),
          onLeave: () => this.wrapper.classList.remove('is-opening'),
        },
        transitions: {
          finish: {
            target: 'open',
            action: () => {},
          },
        },
      },
      closing: {
        actions: {
          onEnter: () => this.wrapper.classList.add('is-closing'),
          onLeave: () => this.wrapper.classList.remove('is-closing', 'is-open'),
        },
        transitions: {
          finish: {
            target: 'closed',
            action: () => {},
          },
        },
      },
      open: {
        actions: {
          onEnter: () => this.wrapper.classList.add('is-open'),
        },
        transitions: {
          close: {
            target: 'closing',
            action: () => {
              this.time = this.transitionTime;
            },
          },
        },
      },
    },
    'closed'
  );

  constructor(protected className: string, protected transitionTime = 500) {
    super('openable');
    this.wrapper.classList.add(className, 'is-closed');
  }

  get isOpen() {
    return this.state.value !== 'closed';
  }

  get isTransitioning() {
    return ['closing', 'opening'].includes(this.state.value);
  }

  tick(delta: number): void {
    if (!this.isTransitioning) return;
    if (this.time <= 0) {
      this.state.transition(
        this.state.value as 'closing' | 'opening',
        'finish'
      );
      this.time = 0;
      return;
    }

    this.time -= delta * 1000;
  }

  open() {
    if (this.isOpen) return;
    this.state.transition('closed', 'open');
  }

  close() {
    if (!this.isOpen || this.isTransitioning) return;
    this.state.transition('open', 'close');
  }

  toggle() {
    if (this.isTransitioning) return;
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
