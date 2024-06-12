export interface Game {

}

export interface Plant {
  icon: string;
  cost: number;
  profit: number;
  time: number;
  plantedAt?: number;
  readyAt?: number;
}

export interface Bed {
  plant?: Plant
}