/**
 * Prevent inertial scrolling events on MacOS.
 * @param cb Real Wheel event callback
 * @returns New callback
 */
export const useWheelCatch = (cb: (e: WheelEvent) => void) => {
  let minScrollWheelInterval = 100;
  let lastScrollWheelTimestamp = 0;
  let lastScrollWheelDelta = 0;

  return (e: WheelEvent) => {
    e.preventDefault();
    const now = Date.now();

    const rapidSuccession =
      now - lastScrollWheelTimestamp < minScrollWheelInterval;
    const otherDirection = lastScrollWheelDelta > 0 !== e.deltaY > 0;
    const speedDecrease = Math.abs(e.deltaY) < Math.abs(lastScrollWheelDelta);

    const isHuman = otherDirection || !rapidSuccession || !speedDecrease;
    if (isHuman) {
      cb.call(this, e);
    }

    lastScrollWheelTimestamp = now;
    lastScrollWheelDelta = e.deltaY;
  };
};
