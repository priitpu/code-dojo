"use client";

import Image from "next/image";

import { useGameContext } from "@/context/GameContext";

import ChangelogModal from "@/components/ChangelogModal/ChangelogModal";
import styles from "./Header.module.css";

const Header = () => {
  const { gameState, updateMoney } = useGameContext();

  const handleCoinClick = () => {
    updateMoney(1);
  };

  return (
    <header className={styles.container}>
      <div className={styles.actionsContainer}>
        <ChangelogModal />
      </div>

      <div className={styles.moneyBackground}>
        <Image
          unoptimized
          src="./assets/images/coin.png"
          alt="Coin currency"
          width={24}
          height={24}
          onClick={handleCoinClick}
        />

        <span className={styles.moneyAmountNumber}>{gameState?.money}</span>
      </div>
    </header>
  );
};

export default Header;
