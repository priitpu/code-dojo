import { WrappedDomie } from '../base/domie';
import { Tickable } from '../base/tickable';
import { Tile } from './tile';
import { Vec2 } from '../../utils/vec2';
import {
  BuyTileEvent,
  TileDeselectEvent,
  TileSelectEvent,
} from '../base/events';
import { clamp, to1D } from '../../utils/math';
import { BuyTile } from './buy-tile';
import { Serialized, SerializedField } from '../base/serialized';
import { useWheelCatch } from '../../utils/wheel-catch';
import { BackgroundTiler } from './background';

/**
 * The game field, composed of tiles (and buy tiles).
 *
 * It is not exactly a fixed grid based approach, although the apparent fixedness of it
 * is enforced by the CSS, it has a few drawbacks compared to a fixed grid approach:
 *
 * A known design flaw is that enumerating the field and constructing the background gets slower the bigger it gets.
 * This is probably offset by the obscene pricing the tiles will get up to according to the formula before the
 * player can actually buy a stupidly large field. A way to remedy this would be an actual fixed grid, even chunked
 * if I wanted to have the same ability to "grow the field to negative coordinates".
 *
 * The frame time counter should compensate the timers in case the update rate is slowed down on large fields as well.
 */
export class Field
  extends WrappedDomie
  implements Tickable, Serialized<SerializedField>
{
  protected tiles: Tile[] = [];
  protected buyTiles: BuyTile[] = [];

  /**
   * Tile W and H
   */
  public tileSize = 128;
  /**
   * New tile base cost
   */
  public tileCost = 100;
  public tileCostFactor = 1.35;

  /**
   * Game area position
   */
  public pos = new Vec2();
  public targetPos = new Vec2();

  /**
   * Game area zoom level (0.1 to 10)
   */
  public zoom = 1;

  /**
   * Currently selected tile.
   */
  public activeTile?: Tile;

  /**
   * Background params
   */
  protected background = new BackgroundTiler(this.tileSize);
  protected backgroundDirty = true;

  // Locals for pointer interaction
  private mousedown = false;
  private dragging = false;
  private pinching = false;
  private prevTouch?: Touch;
  private lastPinchLength = 0;
  private lastPos = new Vec2();

  constructor() {
    super('field');
    // Rebind local handlers so that they can be passed directly as listeners.
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onWheel = useWheelCatch(this.onWheel.bind(this));
    // Do the initial setup.
    this.setup();
  }

  async preload() {
    await this.background.preload();
  }

  /**
   * Update game state.
   * @param delta Elapsed time in seconds
   */
  tick(delta: number): void {
    if (this.backgroundDirty) {
      this.backgroundDirty = false;
      this.background.build(this.createTileMask());
    }
    this.tiles.forEach((tile) => tile.tick(delta));
  }

  /**
   * Center the view on the entire purchased field.
   */
  center() {
    const centerCoord = this.getCenterCoordinates();

    this.pos.set(
      window.innerWidth / 2 - centerCoord.x,
      window.innerHeight / 2 - centerCoord.y
    );
    this.setAreaVariables();
  }

  /**
   * Hide buyable tiles.
   */
  hideBuyables() {
    if (!this.buyTiles.length) return;
    this.buyTiles.forEach((tile) => tile.unmount(this));
    this.buyTiles.length = 0;
  }

  /**
   * Show buyable tiles.
   */
  showBuyables() {
    const minCoords = this.getNegativeExtent().subScalar(1);
    const maxCoords = this.getPositiveExtent().addScalar(1);

    this.hideBuyables();

    for (let x = minCoords.x; x <= maxCoords.x; x++) {
      for (let y = minCoords.y; y <= maxCoords.y; y++) {
        const pos = new Vec2(x, y);
        if (this.tiles.some((tile) => pos.eq(tile))) continue;
        if (this.tiles.every((tile) => pos.distanceTo(tile) > 1)) continue;
        const buyable = new BuyTile(x, y);
        buyable.mount(this);
        buyable.setCost(this.nextTileCost);
        buyable.element.addEventListener('click', () =>
          this.element.dispatchEvent(
            new BuyTileEvent({ pos, cost: this.nextTileCost })
          )
        );
        this.buyTiles.push(buyable);
      }
    }
  }

  /**
   * Place a new tile at `location`.
   * @param location New tile location
   */
  addTile(location: Vec2) {
    this.tiles.push(this.trackTile(new Tile(location.x, location.y)));
    this.showBuyables();
    this.backgroundDirty = true;
  }

  deserialize(pojo: SerializedField) {
    if (!pojo.tiles.length) return;
    this.tiles.forEach((item) => item.unmount(this));
    this.tiles.length = 0;
    for (const tile of pojo.tiles) {
      const [x, y] = tile.xy;
      const newTile = new Tile(x, y);
      newTile.deserialize(tile);
      this.tiles.push(this.trackTile(newTile));
    }
  }

  serialize(): SerializedField {
    return {
      tiles: this.tiles.map((tile) => tile.serialize()),
    };
  }

  /**
   * Create a bitmask of the current tiles.
   * @returns 1D Bitmask array
   */
  protected createTileMask() {
    const min = this.getNegativeExtent();
    const max = this.getPositiveExtent();
    const mask: number[] = [];
    const width = new Vec2(-min.x + max.x, 0).length + 1;
    for (let x = min.x; x <= max.x; x++) {
      for (let y = min.y; y <= max.y; y++) {
        const pos = new Vec2(x, y);
        const isTile = this.tiles.some((tile) => pos.eq(tile));
        const xshift = x - min.x;
        const yshift = y - min.y;
        mask[to1D(xshift, yshift, width)] = Number(isTile);
      }
    }
    return { mask, width, offset: min };
  }

  protected setAreaVariables() {
    this.wrapper.style.setProperty('--field-x', `${this.pos.x}px`);
    this.wrapper.style.setProperty('--field-y', `${this.pos.y}px`);
    this.wrapper.style.setProperty('--field-scale', `${this.zoom}`);
  }

  private selectTile(tile: Tile) {
    this.deselectTile();
    this.activeTile = tile;
    this.element.dispatchEvent(new TileSelectEvent({ tile }));
  }

  private deselectTile() {
    if (!this.activeTile) return;
    const last = this.activeTile;
    this.activeTile = undefined;
    this.element.dispatchEvent(new TileDeselectEvent({ tile: last }));
  }

  private trackTile(tile: Tile) {
    tile.mount(this.element);

    tile.element.addEventListener('pointerup', () => {
      // Tile selection handler
      if (this.dragging && this.pos.distanceTo(this.lastPos) > 1) return;
      this.selectTile(tile);
    });

    return tile;
  }

  private setup() {
    this.wrapper.style.setProperty('--tile-size', `${this.tileSize}px`);
    this.background.mount(this);
    this.addEvents();
    this.prepopulate();
  }

  private addEvents() {
    this.wrapper.addEventListener('touchstart', this.onTouchStart, {
      passive: false,
    });
    this.wrapper.addEventListener('touchmove', this.onTouchMove, {
      passive: false,
    });
    this.wrapper.addEventListener('touchend', this.onTouchEnd);
    this.wrapper.addEventListener('touchcancel', this.onTouchEnd);
    this.wrapper.addEventListener('mousedown', this.onPointerDown);
    this.wrapper.addEventListener('mousemove', this.onPointerMove);
    this.wrapper.addEventListener('mouseup', this.onPointerUp);
    this.wrapper.addEventListener('wheel', this.onWheel, {
      passive: false,
    });
  }

  /**
   * Get the price of the next tile purchase.
   */
  private get nextTileCost() {
    return Math.ceil(
      this.tileCost * Math.pow(this.tileCostFactor, this.tiles.length - 9)
    );
  }

  /**
   * Populate initial tiles
   * @param initialSize Initial square size
   */
  private prepopulate(initialSize = 3) {
    for (let x = 0; x < initialSize; x++) {
      for (let y = 0; y < initialSize; y++) {
        this.tiles.push(this.trackTile(new Tile(x, y)));
      }
    }
  }

  /**
   * Get maximum positive extents of the field.
   * @returns Max positive coordinates
   */
  private getPositiveExtent() {
    return this.tiles.reduce<Vec2>(
      (max, tile) =>
        max.set(
          max.x < tile.x ? tile.x : max.x,
          max.y < tile.y ? tile.y : max.y
        ),
      new Vec2(-9e9, -9e9)
    );
  }

  /**
   * Get minimum negative extents of the field.
   * @returns Min negative coordinates
   */
  private getNegativeExtent() {
    return this.tiles.reduce<Vec2>(
      (min, tile) =>
        min.set(
          min.x > tile.x ? tile.x : min.x,
          min.y > tile.y ? tile.y : min.y
        ),
      new Vec2(9e9, 9e9)
    );
  }

  /**
   * Get the absolute coordinates of the center of the field.
   * @returns Center coordinates
   */
  private getCenterCoordinates() {
    const maxPos = this.getPositiveExtent();
    const minPos = this.getNegativeExtent();

    return maxPos
      .clone()
      .add(minPos)
      .divScalar(2)
      .mulScalar(this.tileSize)
      .addScalar(this.tileSize / 2);
  }

  // Here be user input handlers...

  private onPointerDown() {
    this.dragging = false;
    this.mousedown = true;
  }

  private onPointerMove(e: MouseEvent) {
    if (!this.mousedown) return;
    if (!this.dragging) {
      this.lastPos.copy(this.pos);
    }

    this.dragging = true;
    this.pos.x += e.movementX;
    this.pos.y += e.movementY;
    this.setAreaVariables();
  }

  private onPointerUp(e: MouseEvent) {
    this.pointerUpHandler(e);
  }

  private onWheel(e: WheelEvent) {
    const offsetPos = this.pos.clone();
    const scaleX = (e.clientX - offsetPos.x) / this.zoom;
    const scaleY = (e.clientY - offsetPos.y) / this.zoom;
    e.deltaY < 0 ? (this.zoom *= 1.2) : (this.zoom /= 1.2);
    this.zoom = clamp(this.zoom, 0.1, 10);
    this.pos.set(
      e.clientX - scaleX * this.zoom,
      e.clientY - scaleY * this.zoom
    );
    this.setAreaVariables();
  }

  private onTouchStart(e: TouchEvent) {
    this.prevTouch = e.touches[0];
    if (e.touches.length === 2) {
      this.pinching = true;
    }

    this.onPointerDown();
  }

  private onTouchMove(ev: TouchEvent) {
    const touch = ev.touches[0];
    ev.preventDefault();

    // Pinch zoom implementation
    if (ev.touches.length === 2 && this.pinching) {
      const pinchLength = Math.hypot(
        ev.touches[0].pageX - ev.touches[1].pageX,
        ev.touches[0].pageY - ev.touches[1].pageY
      );

      if (this.lastPinchLength) {
        const delta = pinchLength / this.lastPinchLength;
        const scaleX = (ev.touches[0].clientX - this.pos.x) / this.zoom;
        const scaleY = (ev.touches[0].clientY - this.pos.y) / this.zoom;

        delta > 0 ? (this.zoom *= delta) : (this.zoom /= delta);
        this.zoom = clamp(this.zoom, 0.25, 10);

        this.pos.set(
          ev.touches[0].clientX - scaleX * this.zoom,
          ev.touches[0].clientY - scaleY * this.zoom
        );
        this.setAreaVariables();
      }
      this.lastPinchLength = pinchLength;
    }

    if (!this.mousedown) return;
    if (!this.dragging) {
      this.lastPos.copy(this.pos);
    }

    // Touchscreen movement implementation
    this.dragging = true;
    if (this.prevTouch) {
      this.pos.x += touch.pageX - this.prevTouch.pageX;
      this.pos.y += touch.pageY - this.prevTouch.pageY;
      this.setAreaVariables();
    }
    this.prevTouch = touch;
  }

  private onTouchEnd(e: TouchEvent) {
    this.pinching = false;
    this.lastPinchLength = 0;

    if (!e.touches?.length) {
      this.dragging = false;
    }

    this.pointerUpHandler(e);
  }

  private pointerUpHandler(e: TouchEvent | MouseEvent) {
    this.mousedown = false;
    // Off-click deselector
    if (this.dragging && this.pos.distanceTo(this.lastPos) > 1) return;
    if (this.activeTile && !this.element.contains(e.target as HTMLElement)) {
      this.deselectTile();
    }
  }
}
