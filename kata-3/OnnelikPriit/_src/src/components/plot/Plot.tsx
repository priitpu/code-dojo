import { useContext } from "react";
import { GridContext } from "../../App";
import "./Plot.css";
export interface IPlot {
  x: number;
  y: number;
  readyTimeStamp: number | null;
  id: string;
  seed: "CARROT" | "POTATO" | "EMPTY" | null;
}

export function Plot(props: IPlot) {
  const { x, y } = props;
  const gridContext = useContext(GridContext);

  const getImage = (seed: "CARROT" | "POTATO" | "EMPTY" | null) => {
    switch (seed) {
      case "CARROT":
        return "orange";
      case "POTATO":
        return "green";
      case "EMPTY":
        return "brown";
      default:
        return "transparent";
    }
  };

  const handleClick = () => {
    if (props.seed) {
      return;
    }
    gridContext.buyPlot(x, y);
  };
  return (
    <button
      className="plot"
      style={{
        gridColumnStart: `${x}`,
        gridColumnEnd: `${x + 1}`,
        gridRowStart: `${y}`,
        gridRowEnd: `${y + 1}`,
        background: getImage(props.seed),
      }}
      onClick={handleClick}
    ></button>
  );
}
