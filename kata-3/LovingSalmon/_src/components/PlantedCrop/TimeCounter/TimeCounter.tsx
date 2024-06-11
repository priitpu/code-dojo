import React from "react";

import { getCountdownValues } from "@/lib/utils";

import styles from "./TimeCounter.module.css";

interface Props {
  growthDate: number;
}

const TimeCounter = ({ growthDate }: Props) => {
  const time = getCountdownValues(growthDate);

  return (
    <div className={styles.container}>
      <p className={styles.timeLabel}>
        {time[2] > 0 && <span>{time[2]}h</span>}
        {time[1] > 0 && <span>{time[1]}m</span>}
        {time[0] > 0 && <span>{time[0]}s</span>}
      </p>
    </div>
  );
};

export default TimeCounter;
