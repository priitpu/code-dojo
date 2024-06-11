import { getRandomUniqueMutations } from "@/lib/utils/mutations";

export interface CropProperties {
  name: string;
  imageName: string;
  value: number;
  price: number;
  growthDuration: number;
}

class Crop {
  public name: string;
  public imageName: string;
  public value: number;
  public price: number;
  public growthDuration: number;

  public growthTimeStart: number = 0;
  public growthTimeEnd: number = 0;

  public mutations: any[] = [];

  constructor(
    name: string,
    imageName: string,
    value: number,
    price: number,
    growthDuration: number,
    applyRandomMutations: boolean = false
  ) {
    this.name = name;
    this.imageName = imageName;
    this.value = value;
    this.price = price;
    this.growthDuration = growthDuration;

    if (applyRandomMutations) {
      this.applyRandomMutations();
    }
  }

  private applyRandomMutations() {
    const rng = Math.floor(Math.random() * 100) + 1;

    if (rng >= 1 && rng <= 85) {
      // 85% chance
    } else if (rng > 85 && rng <= 94) {
      // 9% chance

      const uniqueMutations = getRandomUniqueMutations(1);
      this.mutations.push(...uniqueMutations);
    } else if (rng > 94 && rng <= 98) {
      // 4% chance

      const uniqueMutations = getRandomUniqueMutations(2);
      this.mutations.push(...uniqueMutations);
    } else if (rng > 98 && rng <= 100) {
      // 2% chance

      const uniqueMutations = getRandomUniqueMutations(3);
      this.mutations.push(...uniqueMutations);
    }

    this.mutations.forEach((mutation) => {
      if (mutation.name === "Increased Value") {
        this.value = this.value * mutation.value;
        this.price = Math.floor(this.price * mutation.priceChange);
      } else if (mutation.name === "Half Growth Time") {
        this.growthDuration = this.growthDuration * mutation.value;
        this.price = Math.floor(this.price * mutation.priceChange);
      } else if (mutation.name === "Double Amount") {
        this.value = this.value * mutation.value;
        this.price = Math.floor(this.price * mutation.priceChange);
      }
    });
  }

  public plant() {
    const currentTimestamp = new Date().getTime();

    this.growthTimeStart = currentTimestamp;
    this.growthTimeEnd = currentTimestamp + this.growthDuration;
  }
}

export default Crop;
