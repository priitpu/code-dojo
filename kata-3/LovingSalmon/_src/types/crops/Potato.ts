import Crop, { CropProperties } from "../Crop";

const Properties: CropProperties = {
  name: "Potato",
  imageName: "potato",
  value: 65,
  price: 50,
  growthDuration: 1000 * 30 * 1 * 1,
};

class Potato extends Crop {
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

export default Potato;
