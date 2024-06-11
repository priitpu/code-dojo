export interface SerializedPlant {
  plant: string;
  time: number;
}

export interface SerializedTile {
  xy: [number, number];
  plant?: SerializedPlant;
  state?: string;
}

export interface SerializedField {
  tiles: SerializedTile[];
}

export interface SerializedUnlocks {
  unlocked: string[];
}

export interface SerializedGame {
  field: SerializedField;
  money: number;
  unlocks: SerializedUnlocks;
}

/**
 * A game object which can be serialized and deserialized to-and-from Plain Old Javascript Objects (POJOs).
 */
export interface Serialized<T> {
  /**
   * Convert game object to POJO.
   * @returns Plain Old Javascript Object
   */
  serialize(): T;
  /**
   * Read game object state from a POJO.
   * @param pojo Plain Old Javascript Object
   */
  deserialize(pojo: T): void;
}

/**
 * Load serialized save state from persistent storage.
 * @returns Save state
 */
export const getSaveState = (): SerializedGame | undefined => {
  const savestate = window.localStorage.getItem('state');
  if (!savestate) return undefined;
  return JSON.parse(savestate);
};

/**
 * Save serialized save state into persistent storage.
 * @param pojo Serialized state
 */
export const setSaveState = (pojo: SerializedGame) => {
  window.localStorage.setItem('state', JSON.stringify(pojo));
};
