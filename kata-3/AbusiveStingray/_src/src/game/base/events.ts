import { Vec2 } from '../../utils/vec2';
import type { Tile } from '../components/tile';

export interface TileSelectEventData {
  tile: Tile;
}

export interface PlantEventData {
  plant: string;
}

export interface BuyTileEventData {
  pos: Vec2;
  cost: number;
}

export interface UnlockSeedEventData {
  seed: string;
  cost: number;
}

export class TileSelectEvent extends CustomEvent<TileSelectEventData> {
  constructor(data: TileSelectEventData) {
    super('tileselect', { detail: data });
  }
}

export class TileDeselectEvent extends CustomEvent<TileSelectEventData> {
  constructor(data: TileSelectEventData) {
    super('tiledeselect', { detail: data });
  }
}

export class PlantEvent extends CustomEvent<PlantEventData> {
  constructor(data: PlantEventData) {
    super('plant', { detail: data });
  }
}

export class BuyTileEvent extends CustomEvent<BuyTileEventData> {
  constructor(data: BuyTileEventData) {
    super('buytile', { detail: data });
  }
}

export class UnlockSeedEvent extends CustomEvent<UnlockSeedEventData> {
  constructor(data: UnlockSeedEventData) {
    super('unlockseed', { detail: data });
  }
}

declare global {
  interface HTMLElementEventMap {
    tileselect: TileSelectEvent;
    tiledeselect: TileDeselectEvent;
    plant: PlantEvent;
    buytile: BuyTileEvent;
    unlockseed: UnlockSeedEvent;
  }
}
