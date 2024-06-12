import {
  Component,
  For,
  Show,
  createMemo,
  createSignal,
  useContext,
} from "solid-js";
import { Plot } from "../../lib/models/farm.model";
import styles from "./plot-cell.module.scss";
import { availableSeeds, currentTime } from "../../lib/state/farm.state";
import { SeedComponent } from "../seed/seed";
import { PlantingContext } from "../../App";
import { SeedInfo } from "../seed-info/seed-info";

const PlotCell: Component<{
  plot: Plot;
  pos: { col: string; row: string };
}> = (props) => {
  let plotRef: HTMLDivElement | undefined;
  const context = useContext(PlantingContext);
  const [plantOptionsVisible, setPlantOptionsVisible] = createSignal(false);
  const [isHovering, setIsHovering] = createSignal(false);
  const clickEventHandler = (e: MouseEvent) => {
    if (e?.target && !plotRef?.contains(e?.target as Node)) {
      setPlantOptionsVisible(false);
      document.removeEventListener("click", clickEventHandler);
    }
  };
  const handleOpenOptions = () => {
    if (!plantOptionsVisible()) {
      setPlantOptionsVisible(true);
      document.addEventListener("click", clickEventHandler);
    }
  };

  const growthStage = createMemo(() => {
    if (!props.plot.seed?.plantedAt || !props.plot.seed.growthDuration) {
      return 0;
    }
    const timeDifference =
      currentTime() -
      (props.plot.seed?.plantedAt + props.plot.seed?.growthDuration);
    if (timeDifference <= 0) {
      // Super secret formula
      return Math.max(0, 1 + timeDifference / props.plot.seed.growthDuration);
    }
    return 1;
  });

  const isSellable = createMemo(
    () =>
      props.plot.seed?.plantedAt &&
      props.plot.seed.growthDuration &&
      props.plot.seed?.plantedAt + props.plot.seed?.growthDuration <=
        currentTime()
  );

  const handleSell = () => {
    if (isSellable()) {
      context?.sellFlower(props.plot.seed);
    }
  };

  return (
    <div
      ref={plotRef}
      class={styles.plot}
      classList={{
        [styles.plowed]: props.plot?.available || !!props.plot?.seed,
      }}
      style={{
        "--grid-col": +props?.pos?.col + 1,
        "--grid-row": +props?.pos?.row + 1,
      }}
    >
      <Show when={!props.plot?.available && !props.plot?.seed}>
        <button class={styles["empty-plot"]} onClick={context?.buyPlot}>
          <Show when={context?.canBuyPlot}>
            <div class={styles["empty-plot__plus"]}></div>
          </Show>
        </button>
      </Show>
      <Show when={!props.plot?.seed && props.plot?.available}>
        <button class={styles["empty-plot"]} onClick={handleOpenOptions}>
          <div class={styles["empty-plot__plus"]}></div>
        </button>
        <Show when={plantOptionsVisible()}>
          <ul class={styles.options}>
            <For each={availableSeeds()}>
              {(seed) => {
                return <SeedComponent seed={seed} />;
              }}
            </For>
          </ul>
        </Show>
      </Show>
      <Show when={props.plot?.seed}>
        <button
          class={styles.flower}
          disabled={!isSellable()}
          onClick={handleSell}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            class={styles["flower__img"]}
            src={`/src/assets/flower-${props.plot.seed?.type}.webp`}
            width={35}
            height={35}
            alt={`${props.plot.seed?.type} Flower`}
            style={{ "--growth-stage": growthStage() }}
          ></img>
        </button>
        <Show when={isHovering() && props.plot?.seed}>
          <SeedInfo seed={props.plot.seed!} />
        </Show>
      </Show>
    </div>
  );
};

export default PlotCell;
