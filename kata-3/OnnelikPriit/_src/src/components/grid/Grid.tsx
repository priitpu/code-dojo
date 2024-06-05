import { IPlot, Plot } from "../plot/Plot";
import "./Grid.css";
interface IGrid {
  columns: number;
  rows: number;
  plots: IPlot[];
}
export function Grid({ columns, rows, plots }: IGrid) {
  const field = (): IPlot[] => {
    let field: IPlot[] = [];
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const plot = plots.find((plot) => plot.x === x && plot.y === y);
        if (plot) {
          field = [...field, plot];
        } else {
          field = [
            ...field,
            { x, y, readyTimeStamp: null, id: `${x}-${y}-empty`, seed: null },
          ];
        }
      }
    }
    return field;
  };
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns})`,
        gridTemplateRows: `repeat(${rows})`,
      }}
    >
      {field().map((plot) => {
        return <Plot key={plot.id} {...plot} />;
      })}
    </div>
  );
}
