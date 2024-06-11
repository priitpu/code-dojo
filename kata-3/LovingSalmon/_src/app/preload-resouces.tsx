"use client ";

import ReactDOM from "react-dom";

export function PreloadResources() {
  // Preload general images

  ReactDOM.preload("/assets/images/logo.png", {
    as: "image",
    fetchPriority: "high",
  });

  ReactDOM.preload("/assets/images/grass_tile.jpg", {
    as: "image",
    fetchPriority: "high",
  });

  ReactDOM.preload("/assets/images/coin.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/new_farm_tile.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/farm_slot_tile.png", {
    as: "image",
    fetchPriority: "low",
  });

  // Preload mutations images

  ReactDOM.preload("/assets/images/mutations/clock.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/mutations/coin.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/mutations/double.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/mutations/star.png", {
    as: "image",
    fetchPriority: "low",
  });

  // Preload crops images

  // --- Potato

  ReactDOM.preload("/assets/images/crops/potato/crop.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/potato/stage_1.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/potato/stage_2.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/potato/stage_3.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/potato/stage_4.png", {
    as: "image",
    fetchPriority: "low",
  });

  // --- Carrot

  ReactDOM.preload("/assets/images/crops/carrot/crop.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/carrot/stage_1.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/carrot/stage_2.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/carrot/stage_3.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/carrot/stage_4.png", {
    as: "image",
    fetchPriority: "low",
  });

  // --- Corn

  ReactDOM.preload("/assets/images/crops/corn/crop.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/corn/stage_1.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/corn/stage_2.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/corn/stage_3.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/corn/stage_4.png", {
    as: "image",
    fetchPriority: "low",
  });

  // --- Tomato

  ReactDOM.preload("/assets/images/crops/tomato/crop.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/tomato/stage_1.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/tomato/stage_2.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/tomato/stage_3.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/tomato/stage_4.png", {
    as: "image",
    fetchPriority: "low",
  });

  // --- Eggplant

  ReactDOM.preload("/assets/images/crops/eggplant/crop.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/eggplant/stage_1.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/eggplant/stage_2.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/eggplant/stage_3.png", {
    as: "image",
    fetchPriority: "low",
  });

  ReactDOM.preload("/assets/images/crops/eggplant/stage_4.png", {
    as: "image",
    fetchPriority: "low",
  });

  return null;
}
