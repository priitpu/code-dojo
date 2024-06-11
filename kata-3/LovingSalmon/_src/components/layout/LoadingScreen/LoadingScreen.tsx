import React from "react";
import Image from "next/image";

import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <div className={styles.loader} />

        <Image
          priority
          unoptimized
          className={styles.logo}
          src="/assets/images/logo.png"
          alt="Farm Royale logo"
          width={210}
          height={100}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
