import classnames from "classnames";
import Image from "next/image";

import { useGameContext } from "@/context/GameContext";

import { getCropStageImageName } from "@/lib/utils";
import Crop from "@/types/Crop";

import styles from "./PlantedCrop.module.css";
import TimeCounter from "./TimeCounter/TimeCounter";

interface Props {
  crop: Crop;
  tileId: number;
}

const PlantedCrop = ({ crop, tileId }: Props) => {
  const { gameLoopStamp, updateMoney, updateTile } = useGameContext();

  const rarity = crop.mutations.length;
  const growthDate = crop.growthTimeEnd - gameLoopStamp;

  // Substract 1 second to avoid showing 0 seconds when the crop is ready to be harvested
  const distance = crop.growthTimeEnd - crop.growthTimeStart - 1000;
  const point = gameLoopStamp - crop.growthTimeStart;
  const percent = (point * 100) / distance;

  const hasCropGrown = percent >= 100;

  const handleCropClick = () => {
    if (hasCropGrown) {
      updateMoney(crop.value);
      updateTile(tileId, null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rarityStarsContainer}>
        {new Array(rarity).fill(null).map((_, index) => (
          <Image
            key={index}
            unoptimized
            className={styles.rarityStar}
            src="./assets/images/mutations/star.png"
            alt="Rarity star"
            width={20}
            height={20}
          />
        ))}
      </div>

      <div
        onClick={handleCropClick}
        className={classnames(
          styles.cropStageImage,
          hasCropGrown ? styles.cropSelectable : ""
        )}
        style={{
          backgroundImage: `url(./assets/images/crops/${crop.imageName}/${getCropStageImageName(percent)}.png)`,
        }}
      />

      {!hasCropGrown && <TimeCounter growthDate={growthDate} />}
    </div>
  );
};

export default PlantedCrop;
