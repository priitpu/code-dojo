import { Component } from "solid-js";
import { Seed } from "../../lib/models/farm.model";
import styles from "./seed-info.module.scss";
import { emeralds } from "../../lib/state/farm.state";
export const SeedInfo: Component<{ seed: Seed }> = (props) => {
  return (
    <div class={styles.info}>
      <div class={styles["info__title"]}>{props.seed.type} Flower</div>
      <div class={styles["info__description"]}>
        <span class={styles["info__text"]}>
          Cost:{" "}
          <span
            class={
              props.seed.cost > emeralds()
                ? styles["info__not-enough"]
                : undefined
            }
          >
            {props.seed.cost}
          </span>
          <img
            src="/src/assets/emerald.webp"
            width={24}
            height={24}
            alt="Emerald"
          />
        </span>
        <span class={styles["info__text"]}>
          Growth duration: {props.seed.growthDuration / 1000}s
        </span>
        <span class={styles["info__text"]}>
          Value: {props.seed.value}{" "}
          <img
            src="/src/assets/emerald.webp"
            width={24}
            height={24}
            alt="Emerald"
          />
        </span>
      </div>
    </div>
  );
};
