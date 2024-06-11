export interface Tickable {
  /**
   * Tick a game frame.
   * @param delta Seconds since last tick
   */
  tick(delta: number): void;
}
