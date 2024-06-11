import Crop, { CropProperties } from "../Crop";

const Properties: CropProperties = {
  name: "Eggplant",
  imageName: "eggplant",
  value: 300,
  price: 200,
  growthDuration: 1000 * 60 * 10 * 1,
};

class Eggplant extends Crop {
  constructor(applyRandomMutations?: boolean) {
    super(
      Properties.name,
      Properties.imageName,
      Properties.value,
      Properties.price,
      Properties.growthDuration,
      applyRandomMutations
    );
  }
}

export default Eggplant;
