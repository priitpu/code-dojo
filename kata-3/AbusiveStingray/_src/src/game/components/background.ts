import { to1D, to2D } from '../../utils/math';
import { Vec2 } from '../../utils/vec2';
import { Domie } from '../base/domie';

// Unused bitmask for drawing fields of grass.
// Mby I'll use it for something else :D
// const GRASS = [
//   0x1110, 0x1101, null,   0x0001, 0x0010, null,
//   0x1011, 0x0111, null,   0x0100, 0x1000, null,
//   0x0001, 0x0011, 0x0010, 0x1110, 0x1100, 0x1101,
//   0x0101, 0x1111, 0x1010, 0x1010, null, 0x0101,
//   0x0100, 0x1100, 0x1000, 0x1011, 0x0011, 0x0111,
// ];

/**
 * Bitmask representing the corners of each tile at their
 * respective index position on the tilemap image.
 *
 * Bit order: Top-left, top-right, bottom-left, bottom-right
 */
const FARMLAND = [
  // ROW 1
  null,
  null,
  null,
  0x1110,
  0x1101,
  null,
  // ROW 2
  null,
  null,
  null,
  0x1011,
  0x0111,
  null,
  // ROW 3
  null,
  null,
  null,
  0x0001,
  0x0011,
  0x0010,
  // ROW 4
  null,
  null,
  null,
  0x0101,
  0x1111,
  0x1010,
  // ROW 5
  null,
  null,
  null,
  0x0100,
  0x1100,
  0x1000,
];

export class BackgroundTiler extends Domie {
  public canvas = document.createElement('canvas');
  public ctx = this.canvas.getContext('2d');

  public mapTileSize = 32;
  public mapImage!: HTMLImageElement;

  constructor(public tileSize: number, private src = '/assets/farmgrass.png') {
    super('background');
    this.element.appendChild(this.canvas);
  }

  async preload() {
    return new Promise<void>((resolve, reject) => {
      this.mapImage = document.createElement('img');
      this.mapImage.onload = () => resolve();
      this.mapImage.onerror = () => reject();
      this.mapImage.src = this.src;
    });
  }

  build({
    mask,
    width,
    offset,
  }: {
    mask: number[];
    width: number;
    offset: Vec2;
  }) {
    const { tileIndexes, tiledWidth, tiledHeight } = this.getTileMap(
      mask,
      width
    );

    this.canvas.width = tiledWidth * this.mapTileSize;
    this.canvas.height = tiledHeight * this.mapTileSize;
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let x = 0; x < tiledWidth; x++) {
      for (let y = 0; y < tiledHeight; y++) {
        // 1D index of the current tile
        const index = to1D(x, y, tiledWidth);
        // Index of tile on the tilemap at the tile index
        const tileAtPos = tileIndexes[index];
        if (!tileAtPos) continue;
        // Position of the tile on the tilemap image
        const { x: sx, y: sy } = to2D(
          tileAtPos,
          this.mapImage.width / this.mapTileSize
        );
        // Draw the tile on the canvas
        this.ctx?.drawImage(
          this.mapImage,
          sx * this.mapTileSize,
          sy * this.mapTileSize,
          this.mapTileSize,
          this.mapTileSize,
          x * this.mapTileSize,
          y * this.mapTileSize,
          this.mapTileSize,
          this.mapTileSize
        );
      }
    }

    // Position and scale the canvas to match the current field.
    this.canvas.style.setProperty(
      'transform',
      `translate(${(offset.x - 1.5) * this.tileSize}px, ${
        (offset.y - 1.5) * this.tileSize
      }px) scale(${this.tileSize / this.mapTileSize})`
    );
  }

  private getTileMap(mask: number[], width: number) {
    const height = mask.length / width;

    // I don't remember anymore why I added the offsets,
    // but I'm too lazy to change it now, lmao.
    const tiledWidth = width + 3;
    const tiledHeight = height + 3;

    // Bitmask for each tile in the tile map.
    const farmlandMask = Array.from(
      { length: tiledWidth * tiledHeight },
      () => 0
    );

    // Index of each tile in the tile map.
    const tileIndexes: (number | null)[] = Array.from(
      { length: tiledWidth * tiledHeight },
      () => null
    );

    // Start filling tile corners with farmland tiles

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = to1D(x, y, width);
        if (!mask[index]) continue;
        // This could probably be done with a loop, but whatever.
        const topLeftI = to1D(x + 1, y + 1, tiledWidth);
        const topRightI = to1D(x + 2, y + 1, tiledWidth);
        const bottomLeftI = to1D(x + 1, y + 2, tiledWidth);
        const bottomRightI = to1D(x + 2, y + 2, tiledWidth);

        // index << 1
        farmlandMask[topLeftI] |= 0x0001;
        farmlandMask[topRightI] |= 0x0010;
        farmlandMask[bottomLeftI] |= 0x0100;
        farmlandMask[bottomRightI] |= 0x1000;
      }
    }

    // Pick a tile from the tilemap definition based on the corners mask
    // generated previously.
    for (let index = 0; index < tileIndexes.length; index++) {
      const mask = farmlandMask[index];
      const farmIndex = FARMLAND.indexOf(mask);
      if (farmIndex === -1) continue;
      tileIndexes[index] = farmIndex;
    }

    return { tileIndexes, tiledWidth, tiledHeight };
  }
}
