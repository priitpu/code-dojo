import { GameGridCell, PlantedGameGridCell } from '../types/worker/grid';
import { GamePlayer } from '../types/player';
import { Plant } from '../types/plant';
import { sendMessageToWorker } from './sharedWorker';
import { PlantPlantMessage, UnlockCellMessage } from '../types/worker/worker';
import { SendableWorkerActions } from '../types/enums';
import { getCurrentGameState } from './gameState';
import { isStartedGameState, targetIsHTMLElement } from '../shared/predicates';
import { getGameElement, getPlantPickerElement, getPlantSalesElement } from './elements';

export const handleCellClick = (event: MouseEvent) => {
  event.preventDefault();
  const state = getCurrentGameState();
  if ( !isStartedGameState(state) ) {
    throw new Error('Game is not in active state. How did you even?');
  }

  if ( !targetIsHTMLElement(event.currentTarget) ) {
    throw new Error('This is a dom event listener. Please do let me know how did you even???');
  }

  let index = NaN;
  let queryElement = event.currentTarget.parentElement;
  do {
    if ( !queryElement ) {
      throw new Error('What did you do to my beautiful dom?? :(');
    }
    index = Number(queryElement.dataset.cellIndex);
    if ( Number.isNaN(index) ) {
      queryElement = queryElement.parentElement;
    }
  } while ( Number.isNaN(index) && queryElement?.parentElement );

  if ( Number.isNaN(index) ) {
    throw new Error('Could you not.. Please!');
  }

  const cell: GameGridCell | undefined = state.grid.cells[index as unknown as number];

  if ( !cell ) {
    throw new Error('By now you are just toying with me. Pls don\'t!');
  }
  // Handle the click event on the cell
  console.debug('Handling cell click', cell, event);
  if ( cell.hasPlant ) {
    handlePlantedCellClick(cell, queryElement as HTMLDivElement);
  } else {
    if ( cell.hasBeenUnlocked ) {
      handleUnPlantedCellClick(cell, state.player, queryElement as HTMLDivElement);
    } else if ( cell.canBeUnlocked ) {
      handleUnlockCellClick(cell);
    }
  }
};

const handlePlantedCellClick = (cell: PlantedGameGridCell, cellElement: HTMLDivElement) => {
  // Handle the click event on a planted cell
  console.debug('Handling planted cell click', cell);

  const plantSalesElement = getPlantSalesElement();
  const gameElement = getGameElement();

  const cellBounds = cellElement.getBoundingClientRect();
  const gameBounds = gameElement.getBoundingClientRect();

  plantSalesElement.classList.remove('plant-sales__container--hidden');
  plantSalesElement.style.setProperty('--jj-sales-x', `${ cellBounds.left + cellBounds.width / 2 - gameBounds.left }px`);
  plantSalesElement.style.setProperty('--jj-sales-y', `${ cellBounds.top - gameBounds.top }px`);
  plantSalesElement.dataset.cellIndex = cellElement.dataset.cellIndex;

  const plantSalesPriceElement = plantSalesElement.querySelector<HTMLSpanElement>('[data-plant-sales-price]')!;
  plantSalesPriceElement.textContent = cell.plant.plant.stats.harvestValue.toString();

};

const handleUnPlantedCellClick = (cell: GameGridCell, player: GamePlayer, cellElement: HTMLDivElement) => {
  // Handle the click event on an un-planted cell
  console.debug('Handling un-planted cell click', cell, player);

  const plantPickerContainerElement = getPlantPickerElement();
  const gameElement = getGameElement();


  const gameBounds = gameElement.getBoundingClientRect();
  const cellBounds = cellElement.getBoundingClientRect();


  plantPickerContainerElement.classList.remove('plant-picker__container--hidden');
  plantPickerContainerElement.style.setProperty('--jj-plant-picker-x', `${ cellBounds.left + cellBounds.width / 2   - gameBounds.left}px`);
  plantPickerContainerElement.style.setProperty('--jj-plant-picker-y', `${ cellBounds.top  - gameBounds.top }px`);
  plantPickerContainerElement.dataset.currentCellIndex = cellElement.dataset.cellIndex;
};


const handleUnlockCellClick = (cell: GameGridCell) => {
  // Handle the click event on an un-planted cell
  console.debug('Handling unlock cell click', cell);
  const unlockCellMessage: UnlockCellMessage = {
    action: SendableWorkerActions.UNLOCK_CELL,
    value: { cell },
  };
  sendMessageToWorker(unlockCellMessage);
};


export const handlePlantPlant = (evt: MouseEvent, cellIndex: number, selectedPlantId: Plant['id']): void => {
  evt.preventDefault();
  const state = getCurrentGameState();

  if ( !isStartedGameState(state) ) {
    throw new Error('Game is not in active state. How did you even?');
  }
  const cell = state.grid.cells[cellIndex];
  if ( !cell ) {
    throw new Error('Cell not found');
  }
  const selectedPlant = state.player.availablePlants.find(plant => plant.id === selectedPlantId);
  if ( !selectedPlant ) {
    throw new Error('Plant not found');
  }
  console.log(selectedPlant);
  if ( selectedPlant.quantity <= 0 ) {
    throw new Error('No more plants of this type available');
  }
  // Handle the click event on the plant picker
  console.debug('Handling planting a plant', cell, selectedPlant);
  const message: PlantPlantMessage = {
    action: SendableWorkerActions.PLANT_PLANT,
    value: {
      plant: selectedPlant,
      cell,
    },
  };
  sendMessageToWorker(message);
};
