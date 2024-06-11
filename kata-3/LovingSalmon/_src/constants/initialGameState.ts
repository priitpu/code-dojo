import Tomato from "@/types/crops/Tomato";
import Carrot from "@/types/crops/Carrot";
import Corn from "@/types/crops/Corn";
import Potato from "@/types/crops/Potato";
import Eggplant from "@/types/crops/Eggplant";

export const INITIAL_GAME_STATE = {
  money: 500,
  maxTiles: 16,
  tiles: [
    { id: 1, crop: null },
    { id: 2, crop: null },
    { id: 3, crop: null },
    { id: 4, crop: null },
    { id: 5, crop: null },
    { id: 6, crop: null },
    { id: 7, crop: null },
    { id: 8, crop: null },
  ],
  shop: [new Potato(), new Carrot(), new Corn(), new Tomato(), new Eggplant()],
};
