"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export interface IInterfaceState {
  tileSelected?: number;
}

interface InterfaceContextType {
  tileSelected?: number;
  selectTile: (index: number | undefined) => void;
}

const InterfaceContext = createContext<InterfaceContextType | undefined>(
  undefined
);

export function InterfaceProvider({ children }: { children: ReactNode }) {
  const [tileSelected, setTileSelected] = useState<number | undefined>(
    undefined
  );

  const selectTile = (index: number | undefined) => {
    setTileSelected(index);
  };

  return (
    <InterfaceContext.Provider value={{ tileSelected, selectTile }}>
      {children}
    </InterfaceContext.Provider>
  );
}

export function useInterface() {
  const context = useContext(InterfaceContext);

  if (context === undefined) {
    throw new Error("useInterface must be used within a InterfaceProvider");
  }

  return context;
}
