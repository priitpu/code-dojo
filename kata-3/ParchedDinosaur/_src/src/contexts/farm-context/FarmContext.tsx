import { createContext, PropsWithChildren, useState } from "react";
import { cropCost, cropReward, ECropType } from "../../constants/crop";

const INITIAL_SALES = Object.values(ECropType).reduce((sales, type) => {
  return {
    ...sales,
    [type]: 0,
  };
}, {} as Record<ECropType, number>);

interface IFarmContext {
  balance: number;
  sales: Record<ECropType, number>;
  sellItem: (item: ECropType) => void;
  currentlyBuying: ECropType | null;
  plantItem: (item: ECropType) => void;
  selectItemItemToBuy: (item: ECropType | null) => void;
}

export const FarmContext = createContext<IFarmContext>({
  balance: 0,
  sales: INITIAL_SALES,
  sellItem: () => null,
  currentlyBuying: null,
  plantItem: () => null,
  selectItemItemToBuy: () => null,
});

export const FarmContextProvider = ({ children }: PropsWithChildren) => {
  const [balance, setBalance] = useState<number>(1000);
  const [sales] = useState(INITIAL_SALES);
  const [currentlyBuying, setCurrentlyBuying] = useState<ECropType | null>(
    null
  );

  const sellItem = (item: ECropType) => {
    setBalance((currentBalance) => currentBalance + cropReward[item]);
  };

  const selectItemItemToBuy = setCurrentlyBuying;

  const plantItem = (item: ECropType) => {
    setBalance((currentBalance) => currentBalance - cropCost[item]);
    setCurrentlyBuying(null);
  };

  return (
    <FarmContext.Provider
      value={{
        balance,
        sales,
        sellItem,
        currentlyBuying,
        plantItem,
        selectItemItemToBuy,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};
