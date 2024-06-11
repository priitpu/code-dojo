import Crop from "./Crop";

import Potato from "./crops/Potato";
import Carrot from "./crops/Carrot";
import Corn from "./crops/Corn";
import Tomato from "./crops/Tomato";
import Eggplant from "./crops/Eggplant";

export class CropFactory {
  private cropTypes = [Potato, Carrot, Corn, Tomato, Eggplant];

  createRandomCrop(applyRandomMutations?: boolean): Crop {
    const randomIndex = Math.floor(Math.random() * this.cropTypes.length);

    return new this.cropTypes[randomIndex](applyRandomMutations);
  }
}
