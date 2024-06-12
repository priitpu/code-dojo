import { Component, Show, createSignal, useContext } from "solid-js";
import { PlantingContext } from "../../App";
import { Seed } from "../../lib/models/farm.model";
import { emeralds } from "../../lib/state/farm.state";
import { SeedInfo } from "../seed-info/seed-info";
import styles from "./seed.module.scss";

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
          "--flower": `url(./assets/flower-${props.seed.type}.webp)`,
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
