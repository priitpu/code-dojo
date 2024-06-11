"use client";

import React, { useEffect } from "react";

import { useGameContext } from "@/context/GameContext";
import { useInterface } from "@/context/InterfaceContext";

import FarmTile from "@/components/FarmTile/FarmTile";
import NewFarmTile from "@/components/NewFarmTile/NewFarmTile";
import TilesContainer from "@/components/TilesContainer/TilesContainer";

import styles from "./GameScreen.module.css";

const GameScreen = () => {
  const { gameState } = useGameContext();
  const { selectTile } = useInterface();

  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.attributes?.["data-name"]?.value !== "tile") {
        selectTile(undefined);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectTile]);

  return (
    <div className={styles.container}>
      <TilesContainer>
        {gameState?.tiles.map((tile) => <FarmTile key={tile.id} tile={tile} />)}

        {gameState?.tiles?.length! < gameState?.maxTiles! && (
          <NewFarmTile newTileId={gameState?.tiles?.length! + 1} />
        )}
      </TilesContainer>
    </div>
  );
};

export default GameScreen;
