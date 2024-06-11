"use client";

import { useEffect, useState } from "react";

import { useGameContext } from "@/context/GameContext";

import Header from "@/components/layout/Header/Header";
import BottomMenu from "@/components/layout/BottomMenu/BottomMenu";
import GameScreen from "@/components/layout/GameScreen/GameScreen";
import LoadingScreen from "@/components/layout/LoadingScreen/LoadingScreen";

import styles from "./page.module.css";

const APP_VERSION = process.env.npm_package_version;

export default function Home() {
  const { gameState } = useGameContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameState && loading) {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [gameState, loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className={styles.container}>
      <Header />
      <GameScreen />
      <BottomMenu />

      <span className={styles.versionLabel}>v{APP_VERSION}</span>
    </main>
  );
}
