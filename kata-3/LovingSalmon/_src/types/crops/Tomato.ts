import Crop, { CropProperties } from "../Crop";

const Properties: CropProperties = {
  name: "Tomato",
  imageName: "tomato",
  value: 250,
  price: 170,
  growthDuration: 1000 * 60 * 6.5 * 1,
};

class Tomato extends Crop {
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

export default Tomato;
