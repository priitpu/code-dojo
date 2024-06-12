import { Component, For, Show, batch, createSignal } from "solid-js";
import { Seed } from "../../lib/models/farm.model";
import {
  buyableSeeds,
  emeralds,
  setAvailableSeeds,
  setBuyableSeeds,
  setEmeralds,
} from "../../lib/state/farm.state";
import { SeedInfo } from "../seed-info/seed-info";
import styles from "./store.module.scss";

export const StoreItem: Component<{ seed: Seed; nextSeedPrice: number }> = (
  props
) => {
  const [isHovering, setIsHovering] = createSignal(false);
  const handleBuyNewSeed = (seed: Seed) => {
    if (props.nextSeedPrice > emeralds()) return;
    batch(() => {
      setEmeralds((prev) => prev - props.nextSeedPrice);
      setAvailableSeeds((prev) => [...prev, seed]);
      setBuyableSeeds((prev) =>
        prev.filter((buyableSeed) => buyableSeed.type !== seed.type)
      );
    });
  };
  return (
    <li class={styles.seed__item}>
      <button
        class={styles["seed__button"]}
        onClick={() => handleBuyNewSeed(props.seed)}
        disabled={emeralds() < props.nextSeedPrice}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span class={styles["seed__price"]}>
          <img
            src="./assets/emerald.webp"
            width={24}
            height={24}
            alt="Emerald"
          />
          <span
            class={styles["seed__price-text"]}
            classList={{
              [styles["seed__price-text--not-enough"]]:
                emeralds() < props.nextSeedPrice,
            }}
          >
            {props.nextSeedPrice}
          </span>
        </span>
        <span class={styles.arrow}></span>
        <img
          class={styles["seed"]}
          src={`./assets/flower-${props.seed.type}.webp`}
          width={35}
          height={35}
          alt={`${props.seed.type} Flower`}
        ></img>
      </button>
      <Show when={isHovering()}>
        <SeedInfo seed={props.seed} />
      </Show>
    </li>
  );
};

export const Store: Component<{ nextSeedPrice: number }> = (props) => {
  let modalRef: HTMLDialogElement | undefined;
  return (
    <>
      <button
        class={styles.trigger}
        title="Store"
        onClick={() => modalRef?.showModal()}
      >
        Store
        <img
          src="/src/assets/emerald.webp"
          width={24}
          height={24}
          alt="Emerald"
        />
      </button>
      <dialog class={styles.modal} ref={modalRef}>
        <div class={styles.header}>
          Trades
          <button
            class={styles["modal__close"]}
            onClick={() => modalRef?.close()}
          >
            X
          </button>
        </div>
        <Show when={buyableSeeds().length}>
          <ul class={styles.seeds}>
            <For each={buyableSeeds()}>
              {(seed) => {
                return (
                  <StoreItem seed={seed} nextSeedPrice={props.nextSeedPrice} />
                );
              }}
            </For>
          </ul>
        </Show>
        <Show when={!buyableSeeds().length}>You already have everything</Show>
      </dialog>
    </>
  );
};
