"use client";

import React from "react";

import { useInterface } from "@/context/InterfaceContext";
import { useGameContext } from "@/context/GameContext";

import ShopItem from "./ShopItem/ShopItem";
import styles from "./BottomMenu.module.css";

const BottomMenu = () => {
  const { gameState } = useGameContext();
  const { tileSelected } = useInterface();

  return (
    <div
      className={styles.container}
      style={tileSelected !== undefined ? { height: "auto" } : undefined}
    >
      <div className={styles.shopContainer}>
        {gameState?.shop?.map((shopItem: any, index) => (
          <ShopItem key={index} shopItem={shopItem} />
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
