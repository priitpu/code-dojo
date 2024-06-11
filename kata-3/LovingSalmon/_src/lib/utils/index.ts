import {
  INITIAL_TILE_PRICE,
  INITIAL_TILES_COUNT,
  TILE_PRICE_GROWTH_INDEX,
} from "@/constants";

export const calculateNextTilePrice = (newTileIndex: number) => {
  const ROUNDING_FACTOR = 50;

  const nextTilePrice =
    INITIAL_TILE_PRICE *
    TILE_PRICE_GROWTH_INDEX ** (newTileIndex - INITIAL_TILES_COUNT - 1);

  const roundedNextTilePrice =
    Math.round(nextTilePrice / ROUNDING_FACTOR) * ROUNDING_FACTOR;

  return roundedNextTilePrice;
};

export const getCountdownValues = (countDown: number) => {
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return [seconds, minutes, hours];
};

export const getCropStageImageName = (growthPercent: number) => {
  if (growthPercent <= 20) {
    return "stage_1";
  }

  if (growthPercent > 20 && growthPercent <= 50) {
    return "stage_2";
  }

  if (growthPercent > 50 && growthPercent < 100) {
    return "stage_3";
  }

  return "stage_4";
};
