import Image from "next/image";

import { useGameContext } from "@/context/GameContext";
import { calculateNextTilePrice } from "@/lib/utils";

import styles from "./NewFarmTile.module.css";

interface Props {
  newTileId: number;
}

const NewFarmTile = ({ newTileId }: Props) => {
  const { gameState, updateMoney, addTile } = useGameContext();

  const nextTilePrice = calculateNextTilePrice(newTileId);
  const hasEnoughMoney = gameState?.money! >= nextTilePrice;

  const handleTileClick = () => {
    if (hasEnoughMoney) {
      addTile(newTileId);
      updateMoney(-nextTilePrice);
    }
  };

  return (
    <div className={styles.container} onClick={handleTileClick}>
      <Image
        unoptimized
        style={
          !hasEnoughMoney
            ? { filter: "grayscale(0.5)", cursor: "not-allowed" }
            : undefined
        }
        className={styles.newTileImage}
        src="./assets/images/new_farm_tile.png"
        alt="New farm slot tile"
        width={100}
        height={100}
      />

      <div className={styles.priceLabel}>
        <Image
          unoptimized
          src="./assets/images/coin.png"
          alt="Coin currency"
          width={16}
          height={16}
        />

        <span>{nextTilePrice}</span>
      </div>
    </div>
  );
};

export default NewFarmTile;
