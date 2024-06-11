import riceImg from '../assets/rice.svg';
import bananaImg from '../assets/banana.svg';
import watermelonImg from '../assets/watermelon.svg';

export enum ECropType {
  Banana = 'BANANA',
  Rice = 'RICE',
  WaterMelon = 'WATERMELON',
  // Potato = 'POTATO',
}

export const cropImg: Record<ECropType, string> = {
  [ECropType.Rice]: riceImg,
  [ECropType.Banana]: bananaImg,
  [ECropType.WaterMelon]: watermelonImg,
};

export const cropCost: Record<ECropType, number> = {
  [ECropType.Rice]: 300,
  [ECropType.Banana]: 400,
  [ECropType.WaterMelon]: 500,
};

export const cropReward: Record<ECropType, number> = Object.entries(
  cropCost
).reduce((rewards, [crop, cost]) => {
  return { ...rewards, [crop]: cost * 1.5 };
}, {} as Record<ECropType, number>);

export const cropsList = Object.values(ECropType);
