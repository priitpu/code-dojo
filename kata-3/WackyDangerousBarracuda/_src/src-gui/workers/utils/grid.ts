import { GameGrid, GameGridCell } from '../../types/worker/grid';
import {
  calculateGridCellIndex,
  calculateGridCellIndexForCell,
  GRID_MAX_HEIGHT,
  GRID_MAX_WIDTH,
} from '../../shared/grid';

export const generateGameGrid = (width: number = GRID_MAX_WIDTH, height: number = GRID_MAX_HEIGHT): GameGrid => {
  const grid: GameGrid = {
    unlockableCellsCount: 0,
    cells: {},
  };

  const unlockedCellsIndices = [22, 29, 30, 31, 32, 33, 39, 40, 41];


  console.log('Generating grid', width, height);
  for ( let i = 0; i < height; i++ ) {
    for ( let j = 0; j < width; j++ ) {

      const cell: GameGridCell = {
        x: j,
        y: i,
        // Immediately unlock the middle three cells
        // hasBeenUnlocked: true,
        hasBeenUnlocked: false,
        canBeUnlocked: false,
        hasPlant: false,
      };

      const cellIndex = calculateGridCellIndexForCell(cell);
      cell.hasBeenUnlocked = unlockedCellsIndices.includes(cellIndex);
      console.debug('Generated cell', cell);

      grid.cells[cellIndex] = cell;
    }
  }
  return setUnlockableCells(grid);
};

export const setUnlockableCells = (grid: GameGrid): GameGrid => {
  Object.values(grid.cells).forEach((cell) => {
    const cellIndex = calculateGridCellIndexForCell(cell);

    const adjecentCells = [
      grid.cells[(cellIndex - ( 2 - cellIndex % 2 ))],
      grid.cells[(cellIndex + ( 2 - cellIndex % 2 ))],
      grid.cells[(calculateGridCellIndex(cell.x, cell.y - 1))],
      grid.cells[(calculateGridCellIndex(cell.x, cell.y + 1))],
    ];
    cell.canBeUnlocked = adjecentCells.some((cell) => cell && cell.hasBeenUnlocked);
  });
  return grid;
};
