import Image from "next/image";

import { useInterface } from "@/context/InterfaceContext";

import PlantedCrop from "../PlantedCrop/PlantedCrop";
import styles from "./FarmTile.module.css";

interface Props {
  tile: any;
}

const FarmTile = ({ tile }: Props) => {
  const { tileSelected, selectTile } = useInterface();

  const hasCropPlanted = tile.crop;

  const handleTileClick = () => {
    if (!hasCropPlanted) {
      selectTile(tile.id);
    }
  };

  return (
    <div className={styles.container} onClick={handleTileClick}>
      {hasCropPlanted && <PlantedCrop crop={tile.crop} tileId={tile.id} />}

      <Image
        unoptimized
        data-name="tile"
        className={!hasCropPlanted ? styles.tileSelectable : undefined}
        src="./assets/images/farm_slot_tile.png"
        alt="Farm slot tile"
        width={100}
        height={100}
        style={{
          filter:
            tileSelected === tile.id
              ? `drop-shadow(1px 1px 0 var(--selected-outline-clr))
                drop-shadow(-1px 1px 0 var(--selected-outline-clr))
                drop-shadow(1px -1px 0 var(--selected-outline-clr))
                drop-shadow(-1px -1px 0 var(--selected-outline-clr))`
              : undefined,
        }}
      />
    </div>
  );
};

export default FarmTile;
