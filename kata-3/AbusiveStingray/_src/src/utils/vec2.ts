import { lerp } from './math';

/**
 * Something that has an x and y coordinate.
 */
export interface Vec2Like {
  x: number;
  y: number;
}

/**
 * Two-dimensional point.
 */
export class Vec2 implements Vec2Like {
  constructor(public x = 0, public y = 0) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  copy(other: Vec2Like) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  eq(other: Vec2Like) {
    return this.x === other.x && this.y === other.y;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  add(other: Vec2Like) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  sub(other: Vec2Like) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  mul(other: Vec2Like) {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }

  div(other: Vec2Like) {
    this.x /= other.x;
    this.y /= other.y;
    return this;
  }

  addScalar(scalar: number) {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  subScalar(scalar: number) {
    this.x -= scalar;
    this.y -= scalar;
    return this;
  }

  mulScalar(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  divScalar(scalar: number) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  lerp(other: Vec2Like, amount: number) {
    this.x = lerp(this.x, other.x, amount);
    this.y = lerp(this.y, other.y, amount);
  }

  distanceTo(other: Vec2Like) {
    return Math.hypot(Math.abs(other.y - this.y), Math.abs(other.x - this.x));
  }
}
