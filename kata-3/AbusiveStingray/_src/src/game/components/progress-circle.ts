import { Domie } from '../base/domie';

/**
 * Procedurally generate progress circle SVG element.
 *
 * Ugly spaghetti, doesn't even taste very good.
 */
export class ProgressCircle extends Domie {
  public svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  public circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  public circle2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );

  constructor(protected size = 64, protected width = 8) {
    super('progress');
    const radius = size / 2;
    const dasharray = (Math.PI * ((radius - width) * 2)).toFixed(2);
    this.svg.setAttribute('width', String(size));
    this.svg.setAttribute('height', String(size));
    this.svg.setAttribute('viewport', `0 0 ${size} ${size}`);

    this.circle.style.setProperty('stroke-width', `${width}px`);
    this.circle.setAttribute('cx', String(radius));
    this.circle.setAttribute('cy', String(radius));
    this.circle.setAttribute('fill', 'transparent');
    this.circle.setAttribute('r', `${radius - width}`);
    this.circle.setAttribute('stroke-dasharray', `${dasharray}`);
    this.svg.appendChild(this.circle);

    this.circle2.style.setProperty('stroke-width', `${width}px`);
    this.circle2.setAttribute('cx', String(radius));
    this.circle2.setAttribute('cy', String(radius));
    this.circle2.setAttribute('fill', 'transparent');
    this.circle2.setAttribute('r', `${radius - width}`);
    this.circle2.setAttribute('stroke-dasharray', `${dasharray}`);
    this.svg.appendChild(this.circle2);
    this.element.appendChild(this.svg);
    this.setProgress(0);
  }

  setProgress(num: number) {
    const radius = this.size / 2;
    const dasharray = Math.PI * ((radius - this.width) * 2);
    const offset = ((100 - num) / 100) * dasharray;
    this.circle2.setAttribute('stroke-dashoffset', `${offset.toFixed(2)}`);
  }
}
