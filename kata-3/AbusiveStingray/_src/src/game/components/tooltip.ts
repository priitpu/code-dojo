import { Domie, WrappedDomie } from '../base/domie';

export class Tooltip extends WrappedDomie {
  private currElement?: Domie;
  public isOpen = false;

  constructor() {
    super('tooltip');
    this.wrapper.style.display = 'none';
  }

  open(x: number, y: number, el: Domie) {
    this.currElement = el;
    this.wrapper.style.setProperty('--tooltip-x', String(x));
    this.wrapper.style.setProperty('--tooltip-y', String(y));
    this.wrapper.style.display = 'block';
    this.isOpen = true;
    el.mount(this);
  }

  close() {
    if (!this.isOpen) return;
    if (this.currElement) {
      this.currElement.unmount(this);
    }
    this.wrapper.style.display = 'none';
    this.isOpen = false;
  }
}
