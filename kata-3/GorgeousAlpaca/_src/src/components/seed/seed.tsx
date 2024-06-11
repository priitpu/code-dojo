import { Component, Show, createSignal, useContext } from "solid-js";
import { Seed } from "../../lib/models/farm.model";
import styles from "./seed.module.scss";
import { PlantingContext } from "../../App";
import { emeralds } from "../../lib/state/farm.state";
import { SeedInfo } from "../seed-info/seed-info";

export const SeedComponent: Component<{ seed: Seed }> = (props) => {
  const [isHovering, setIsHovering] = createSignal(false);
  const context = useContext(PlantingContext);
  const handlePlant = () => {
    context?.plantSeed(props.seed);
  };
  return (
    <li>
      <button
        class={styles.seed}
        style={{
          "--flower": `url(/src/assets/flower-${props.seed.type}.webp)`,
        }}
        aria-label={`Plant ${props.seed.type} seed`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handlePlant}
        disabled={props.seed.cost > emeralds()}
      ></button>
      <Show when={isHovering()}>
        <SeedInfo seed={props.seed} />
      </Show>
    </li>
  );
};
