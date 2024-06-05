import { Reducer, createContext, useReducer } from "react";
import "./App.css";
import { Grid } from "./components/grid/Grid";
import { IPlot } from "./components/plot/Plot";

export const GridContext = createContext<{
  columns: number;
  rows: number;
  buyPlot: (x: number, y: number) => void;
}>({ columns: 0, rows: 0, buyPlot: () => {} });

interface FarmState {
  columns: number;
  rows: number;
  plots: IPlot[];
}

interface FarmAction {
  type: "PLOT_BUY" | "SEED_BUY" | "PLOT_HARVEST";
  data: { x: number; y: number };
}

const shiftPlots = (state: FarmState, data: { x: number; y: number }) => {
  return state.plots.map((plot) => {
    if (data.x === state.columns - 1) {
      return {
        ...plot,
      };
    }
    if (data.y === state.rows - 1) {
      return {
        ...plot,
      };
    }
    if (data.x === 0) {
      return {
        ...plot,
        x: plot.x + 1,
      };
    }
    if (data.y === 0) {
      return {
        ...plot,
        y: plot.y + 1,
      };
    }
    return { ...plot };
  });
};

const addRowsOrColumns = (state: FarmState, data: { x: number; y: number }) => {
  return {
    columns:
      data.x === state.columns - 1 || data.x === 0
        ? state.columns + 1
        : state.columns,
    rows:
      data.y === state.rows - 1 || data.y === 0 ? state.rows + 1 : state.rows,
  };
};

const reducer = (state: FarmState, action: FarmAction): FarmState => {
  switch (action.type) {
    case "PLOT_BUY":
      return {
        ...state,
        ...addRowsOrColumns(state, action.data),
        plots: [
          ...shiftPlots(state, action.data),
          {
            x: action.data.x === 0 ? action.data.x + 1 : action.data.x,
            y: action.data.y === 0 ? action.data.y + 1 : action.data.y,
            readyTimeStamp: null,
            id: `${state.columns - 1}-${state.rows - 1}`,
            seed: "EMPTY",
          },
        ],
      };
    default:
      throw new Error("Invalid action type");
      return state;
  }
};

const INITIAL_STATE: FarmState = {
  columns: 3,
  rows: 3,
  plots: [{ x: 1, y: 1, readyTimeStamp: 0, id: "0-0", seed: "CARROT" }],
};

function App() {
  const [state, dispatch] = useReducer<Reducer<FarmState, FarmAction>>(
    reducer,
    INITIAL_STATE
  );
  return (
    <>
      <div className="farm">
        <GridContext.Provider
          value={{
            columns: state.columns,
            rows: state.rows,
            buyPlot: (x, y) => dispatch({ type: "PLOT_BUY", data: { x, y } }),
          }}
        >
          <Grid columns={state.columns} rows={state.rows} plots={state.plots} />
        </GridContext.Provider>
      </div>
    </>
  );
}

export default App;
