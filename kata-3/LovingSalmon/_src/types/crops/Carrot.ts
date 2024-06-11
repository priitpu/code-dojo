import Crop, { CropProperties } from "../Crop";

const Properties: CropProperties = {
  name: "Carrot",
  imageName: "carrot",
  value: 100,
  price: 75,
  growthDuration: 1000 * 60 * 1 * 1,
};

class Carrot extends Crop {
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

export default Carrot;
