"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { LOCAL_STORAGE_KEY } from "@/constants";
import { INITIAL_GAME_STATE } from "@/constants/initialGameState";

import { CropFactory } from "@/types/CropFactory";

export interface IGameState {
  money: number;
  maxTiles: number;
  shop: any[];
  tiles: any[];
}

interface GameContextType {
  gameState?: IGameState;
  gameLoopStamp: number;
  cropFactory: CropFactory;
  updateTile: (id: number, crop: any) => void;
  updateMoney: (value: number) => void;
  updateShop: () => void;
  addTile: (newTileId: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<IGameState | undefined>(undefined);
  const [gameLoopStamp, setGameLoopStamp] = useState(new Date().getTime());
  const [cropFactory] = useState<CropFactory>(new CropFactory());

  useEffect(() => {
    const gameLoop = () => {
      setGameLoopStamp(Date.now());
    };

    const interval = setInterval(gameLoop, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const localGameState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localGameState) {
      setGameState(JSON.parse(localGameState));
    } else {
      setGameState(INITIAL_GAME_STATE);
    }
  }, []);

  useEffect(() => {
    if (gameState) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const updateTile = (id: number, crop: any) => {
    const newTiles = gameState!.tiles.map((tile) => {
      if (tile.id === id) {
        return { ...tile, crop };
      }

      return tile;
    });

    setGameState((prev) => ({ ...prev!, tiles: newTiles }));
  };

  const updateMoney = (value: number) => {
    if (!gameState || gameState.money + value < 0) {
      return;
    }

    setGameState((prev) => ({ ...prev!, money: prev!.money + value }));
  };

  const updateShop = () => {
    const newShopItems = new Array(5)
      .fill(null)
      .map(() => cropFactory.createRandomCrop(true));

    setGameState((prev) => ({ ...prev!, shop: newShopItems }));
  };

  const addTile = (newTileId: number) => {
    if (!gameState || gameState.tiles.length >= gameState.maxTiles) {
      return;
    }

    const newTile = { id: newTileId, crop: null };

    setGameState((prev) => ({
      ...prev!,
      tiles: [...prev!.tiles, newTile],
    }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameLoopStamp,
        cropFactory,
        updateTile,
        updateMoney,
        updateShop,
        addTile,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
}
