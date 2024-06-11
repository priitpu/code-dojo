import React, { ReactNode } from "react";

import styles from "./TilesContainer.module.css";

interface Props {
  children: ReactNode;
}

const TilesContainer = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default TilesContainer;
