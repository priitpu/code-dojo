import { Serialized, SerializedPlant } from '../base/serialized';
import { Tickable } from '../base/tickable';

export class Plant implements Tickable, Serialized<SerializedPlant> {
  public life = 0;
  public ready = false;

  public static price = 0;
  public static sellPrice = 0;
  public static time = 0;
  public static totalStages = 0;

  constructor(
    public name: string,
    public seedPrice: number,
    public sellPrice: number,
    public timeToGrow: number,
    public stages: number
  ) {}

  tick(time: number) {
    if (this.ready) return false;
    this.life += time * 1000;

    if (this.life >= this.timeToGrow) {
      this.life = this.timeToGrow;
      this.ready = true;
      return false;
    }

    return true;
  }

  deserialize(pojo: SerializedPlant): void {
    this.life = pojo.time;
    if (this.life >= this.timeToGrow) {
      this.ready = true;
    }
  }

  serialize(): SerializedPlant {
    return {
      plant: this.name,
      time: this.life,
    };
  }

  get percentage() {
    return (this.life / this.timeToGrow) * 100;
  }

  get timeLeft() {
    if (this.ready) return 0;
    return (this.timeToGrow - this.life) / 1000;
  }

  get stage() {
    return Math.floor(this.stages * (this.life / this.timeToGrow));
  }
}

export interface PlantConstructor {
  price: number;
  sellPrice: number;
  time: number;
  totalStages: number;
  new (): Plant;
}

export class Wheat extends Plant {
  public static override price = 10;
  public static override sellPrice = 40;
  public static override time = 20000;
  public static override totalStages = 2;

  constructor() {
    super('wheat', Wheat.price, Wheat.sellPrice, Wheat.time, Wheat.totalStages);
  }
}

export class Carrot extends Plant {
  public static override price = 40;
  public static override sellPrice = 90;
  public static override time = 60000;
  public static override totalStages = 2;

  constructor() {
    super(
      'carrot',
      Carrot.price,
      Carrot.sellPrice,
      Carrot.time,
      Carrot.totalStages
    );
  }
}

export class Potato extends Plant {
  public static override price = 90;
  public static override sellPrice = 220;
  public static override time = 120000;
  public static override totalStages = 2;

  constructor() {
    super(
      'potato',
      Potato.price,
      Potato.sellPrice,
      Potato.time,
      Potato.totalStages
    );
  }
}

export class Radish extends Plant {
  public static override price = 85;
  public static override sellPrice = 180;
  public static override time = 80000;
  public static override totalStages = 2;

  constructor() {
    super(
      'radish',
      Radish.price,
      Radish.sellPrice,
      Radish.time,
      Radish.totalStages
    );
  }
}

export class Pumpkin extends Plant {
  public static override price = 120;
  public static override sellPrice = 480;
  public static override time = 240000;
  public static override totalStages = 3;

  constructor() {
    super(
      'pumpkin',
      Pumpkin.price,
      Pumpkin.sellPrice,
      Pumpkin.time,
      Pumpkin.totalStages
    );
  }
}

export const Plants: Record<string, PlantConstructor> = {
  wheat: Wheat,
  carrot: Carrot,
  radish: Radish,
  potato: Potato,
  pumpkin: Pumpkin,
};
