import { createSignal } from "solid-js";
import { Farm, Plot, Seed } from "../models/farm.model";
import { getIndicesFromKey } from "../utils/utils";

// Time in ms for each game loop
export const loopTime = 500;
export const storageKey = "seedcraft_state";

export const [farmState, setFarmState] = createSignal<Farm>(
  {
    // Add 3x3 by default
    ...[1000, 1001, 1002].reduce((acc: Farm, col) => {
      [1000, 1001, 1002].forEach(
        (row) => (acc[`${col}:${row}`] = { available: true })
      );
      return acc;
    }, {}),
  },
  {
    // Assume that any change is an update
    equals: false,
  }
);

export const [emeralds, setEmeralds] = createSignal(200);
export const [currentTime, setCurrentTime] = createSignal(0);

const pos = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// Add buyable plots around existing plots
export function addAvailablePlots(farmState: Farm) {
  const newState = structuredClone(farmState);
  // Add new buyable plots around any owned plots
  Object.keys(farmState).forEach((key) => {
    const [colIndex, rowIndex] = getIndicesFromKey(key);
    pos.forEach(([x, y]) => {
      const newCol = colIndex + x;
      const newRow = rowIndex + y;
      const newPlot = newState?.[`${newCol}:${newRow}`];
      if (!newPlot) {
        newState[`${newCol}:${newRow}`] = {};
      }
    });
  });
  return newState;
}

export function setPlotState(col: string, row: string, newValue: Plot) {
  setFarmState((prev) => {
    const newState = structuredClone(prev);
    newState[`${col}:${row}`] = newValue;
    return newState;
  });
}

export const [availableSeeds, setAvailableSeeds] = createSignal<Seed[]>([
  { type: "blue", cost: 50, growthDuration: 5000, value: 75 },
  { type: "red", cost: 75, growthDuration: 10000, value: 125 },
  { type: "purple", cost: 200, growthDuration: 15000, value: 350 },
]);

export const [buyableSeeds, setBuyableSeeds] = createSignal<Seed[]>([
  { type: "white", cost: 300, growthDuration: 20000, value: 600 },
  { type: "orange", cost: 500, growthDuration: 30000, value: 1000 },
]);
