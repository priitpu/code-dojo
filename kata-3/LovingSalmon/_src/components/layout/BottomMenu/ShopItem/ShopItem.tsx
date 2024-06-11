import React from "react";
import Image from "next/image";

import { useInterface } from "@/context/InterfaceContext";
import { useGameContext } from "@/context/GameContext";

import Crop from "@/types/Crop";

import styles from "./ShopItem.module.css";
import { getCountdownValues } from "@/lib/utils";

interface Props {
  shopItem: any;
}

const ShopItem = ({ shopItem }: Props) => {
  const { gameState, updateTile, updateMoney, updateShop } = useGameContext();
  const { tileSelected } = useInterface();

  const growthTime = getCountdownValues(shopItem.growthDuration);
  const hasMutations = shopItem.mutations.length > 0;
  const hasEnoughMoney = gameState?.money! >= shopItem.price;

  const handleClick = (shopItem: any) => {
    if (hasEnoughMoney) {
      const crop = new Crop(
        shopItem.name,
        shopItem.imageName,
        shopItem.value,
        shopItem.price,
        shopItem.growthDuration
      );

      crop.mutations = shopItem.mutations;
      crop.plant();

      updateMoney(-shopItem.price);
      updateTile(tileSelected!, crop);
      updateShop();
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.buyPriceLabel}>
        <Image
          unoptimized
          src="/assets/images/coin.png"
          alt="Coin currency"
          width={16}
          height={16}
        />
        {shopItem.price}
      </span>

      <button
        className={styles.shopItem}
        onClick={() => handleClick(shopItem)}
        style={
          !hasEnoughMoney
            ? { filter: "grayscale(0.5)", cursor: "not-allowed" }
            : undefined
        }
      >
        {hasMutations && (
          <span className={styles.rarityLabel}>
            {shopItem.mutations.map((mutation: any, index: number) => (
              <Image
                unoptimized
                key={index}
                className={styles.mutationIcon}
                src={`/assets/images/mutations/${mutation.iconName}.png`}
                alt="Mutation icon"
                width={12}
                height={12}
              />
            ))}
          </span>
        )}

        <Image
          unoptimized
          src={`/assets/images/crops/${shopItem.imageName}/crop.png`}
          alt={shopItem.name}
          width={36}
          height={36}
        />

        <span className={styles.durationLabel}>
          {growthTime[2] > 0 && <span>{growthTime[2]}h</span>}
          {growthTime[1] > 0 && <span>{growthTime[1]}m</span>}
          {growthTime[0] > 0 && <span>{growthTime[0]}s</span>}
        </span>
      </button>

      <span className={styles.sellPriceLabel}>
        <Image
          unoptimized
          src="/assets/images/coin.png"
          alt="Coin currency"
          width={16}
          height={16}
        />
        {shopItem.value}
      </span>
    </div>
  );
};

export default ShopItem;
