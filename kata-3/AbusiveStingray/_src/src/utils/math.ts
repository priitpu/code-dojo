import { Vec2 } from './vec2';

/**
 * Linear interpolation - move `a` towards `b` by factor of `t`.
 * @param a From
 * @param b To
 * @param t Amount
 * @returns Interpolated value
 */
export const lerp = (a: number, b: number, t: number) => a + t * (b - a);

/**
 * Clamp `val` between `min` and `max`.
 * @param val Value
 * @param min Minimum
 * @param max Maximum
 * @returns Clamped value
 */
export const clamp = (val: number, min: number, max: number) =>
  Math.max(Math.min(val, max), min);

/**
 * Get a fixed number rounded to `digits` decimal points.
 * @param num Number
 * @param digits Digits after the decimal point
 * @param base Number system base
 * @returns Fixed number
 */
export const toFixedNumber = (num: number, digits = 2, base = 10) => {
  const pow = Math.pow(base ?? 10, digits);
  return Math.round(num * pow) / pow;
};

export function to2D(index: number, size: number): Vec2 {
  const y = Math.floor(index / size);
  const x = index % size;
  return new Vec2(x, y);
}

export function to1D(x: number, y: number, size: number): number {
  return y * size + x;
}
