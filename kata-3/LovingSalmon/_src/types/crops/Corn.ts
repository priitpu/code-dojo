import Crop, { CropProperties } from "../Crop";

const Properties: CropProperties = {
  name: "Corn",
  imageName: "corn",
  value: 200,
  price: 140,
  growthDuration: 1000 * 60 * 5 * 1,
};

class Corn extends Crop {
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

export default Corn;
