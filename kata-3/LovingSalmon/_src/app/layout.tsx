import React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { GameProvider } from "@/context/GameContext";
import { InterfaceProvider } from "@/context/InterfaceContext";

import { PreloadResources } from "./preload-resouces";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarmRoyale",
  description: "Your cozy farm to gamble and relax",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PreloadResources />

      <body className={inter.className}>
        <GameProvider>
          <InterfaceProvider>{children}</InterfaceProvider>
        </GameProvider>
      </body>
    </html>
  );
}
