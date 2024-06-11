/**
 * "mountable" component with an HTML element.
 */
export class Domie {
  public element = document.createElement('div');

  constructor(initialClass: string) {
    this.element.classList.add(initialClass);
  }

  mount(parent: HTMLElement | Domie) {
    if (parent instanceof Domie) {
      parent.element.appendChild(this.element);
    } else {
      parent.appendChild(this.element);
    }
    return this;
  }

  unmount(parent: HTMLElement | Domie) {
    if (parent instanceof Domie) {
      parent.element.removeChild(this.element);
    } else {
      parent.removeChild(this.element);
    }
    return this;
  }
}
/**
 * "mountable" component with two HTML elements - a wrapper and inner element.
 */
export class WrappedDomie extends Domie {
  public wrapper = document.createElement('div');

  constructor(className: string) {
    super(`${className}-inner`);
    this.wrapper.classList.add(`${className}-wrapper`);
    this.wrapper.appendChild(this.element);
  }

  override mount(parent: Domie | HTMLElement): this {
    if (parent instanceof Domie) {
      parent.element.appendChild(this.wrapper);
    } else {
      parent.appendChild(this.wrapper);
    }
    return this;
  }

  override unmount(parent: Domie | HTMLElement): this {
    if (parent instanceof Domie) {
      parent.element.removeChild(this.wrapper);
    } else {
      parent.removeChild(this.wrapper);
    }
    return this;
  }
}
