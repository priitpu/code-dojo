import {
  For,
  batch,
  createContext,
  createEffect,
  createMemo,
  onCleanup,
  onMount,
  type Component,
} from "solid-js";

import styles from "./App.module.scss";
import PlotCell from "./components/plot-cell/plot-cell";
import { Seed } from "./lib/models/farm.model";
import {
  addAvailablePlots,
  availableSeeds,
  buyableSeeds,
  currentTime,
  emeralds,
  farmState,
  loopTime,
  setAvailableSeeds,
  setBuyableSeeds,
  setCurrentTime,
  setEmeralds,
  setFarmState,
  setPlotState,
  storageKey,
} from "./lib/state/farm.state";
import { Store } from "./components/store/store";

export const PlantingContext = createContext<{
  plantSeed: (seed: Seed) => void;
  canBuyPlot: boolean;
  buyPlot: () => void;
  sellFlower: (seed?: Seed) => void;
}>();

const App: Component = () => {
  let interval: number;

  onMount(() => {
    const savedState = localStorage.getItem(storageKey);
    // Get any existing state
    batch(() => {
      if (savedState) {
        const state = JSON.parse(savedState);

        if (state.farm) {
          setFarmState(state.farm);
        }
        if (state.emeralds) {
          setEmeralds(state.emeralds);
        }
        if (state.availableSeeds) {
          setAvailableSeeds(state.availableSeeds);
        }
        if (state.buyableSeeds) {
          setBuyableSeeds(state.buyableSeeds);
        }
      }
      setCurrentTime(new Date().getTime());
    });
    // Start game loop
    interval = setInterval(
      () => setCurrentTime((prev) => prev + loopTime),
      loopTime
    );
  });

  createEffect(() =>
    // Save state when farm or emeralds change
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        farm: farmState(),
        emeralds: emeralds(),
        availableSeeds: availableSeeds(),
        buyableSeeds: buyableSeeds(),
      })
    )
  );

  const paddedState = createMemo(() => addAvailablePlots(farmState()));
  const plotPrice = createMemo(() =>
    // Exponential increase in plot price
    Math.floor(200 * 1.1 ** Object.keys(farmState()).length)
  );

  const nextSeedPrice = createMemo(() =>
    // Exponential increase in additional seed price
    Math.floor(200 * 1.5 ** Object.keys(availableSeeds()).length)
  );

  const getPlantSeedHandler = (col: string, row: string) => {
    return (seed: Seed) => {
      if (emeralds() >= seed.cost) {
        batch(() => {
          setEmeralds((prev) => prev - seed.cost);
          setPlotState(col, row, {
            seed: { ...seed, plantedAt: currentTime() },
          });
        });
      }
    };
  };

  const getBuyPlotHandler = (col: string, row: string) => {
    return () => {
      if (emeralds() < plotPrice()) {
        return;
      }
      batch(() => {
        setEmeralds((prev) => prev - plotPrice());
        setPlotState(col, row, { available: true });
      });
    };
  };

  const getSellFlowerHandler = (col: string, row: string) => {
    return (seed?: Seed) => {
      if (seed) {
        batch(() => {
          setPlotState(col, row, { available: true });
          setEmeralds((prev) => prev + seed.value);
        });
      }
    };
  };
  onCleanup(() => clearInterval(interval));

  return (
    <main>
      <div class={styles.hud}>
        <div class={styles["hud__text"]}>
          Balance: {emeralds()}
          <img
            src="/src/assets/emerald.webp"
            width={24}
            height={24}
            alt="Emerald"
          />
        </div>
        <div class={styles["hud__text"]}>
          Next plot: {plotPrice()}
          <img
            src="/src/assets/emerald.webp"
            width={24}
            height={24}
            alt="Emerald"
          />
        </div>
      </div>
      <Store nextSeedPrice={nextSeedPrice()} />
      <div class={styles.farm}>
        <For each={Object.entries(paddedState())}>
          {([key, plot]) => {
            const [col, row] = key?.split(":");
            return (
              <PlantingContext.Provider
                value={{
                  plantSeed: getPlantSeedHandler(col, row),
                  canBuyPlot: emeralds() >= plotPrice(),
                  buyPlot: getBuyPlotHandler(col, row),
                  sellFlower: getSellFlowerHandler(col, row),
                }}
              >
                <PlotCell plot={plot} pos={{ col, row }} />
              </PlantingContext.Provider>
            );
          }}
        </For>
      </div>
    </main>
  );
};

export default App;
