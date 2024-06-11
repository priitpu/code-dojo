import {
  getBattleEndedContainerElement,
  getCloseShopElement,
  getEndBattleElement,
  getGameField,
  getOpenShopElement,
  getPlantSalesButtonElement,
  getRestartElement,
  getShopElement,
  getSplashContinueElement,
  getSplashStartElement,
  getStartBattleElement,
} from './elements';
import {
  ContinueGameMessage,
  FindOpponentMessage,
  SellPlantMessage,
  StartGameMessage,
} from '../types/worker/worker';
import { HudState, SendableWorkerActions } from '../types/enums';
import { sendMessageToWorker } from './sharedWorker';
import {
  renderBattleReady,
  renderBuyableCells,
  renderCloseShop,
  renderHidePlantPickerElement,
  renderHidePlantSalesElement,
  renderOpenShop, renderScaleField,
  renderShopShelve,
  renderSplashAnimate,
  renderSwitchHud, renderVersion,
} from './gameRenderer';
import { getCurrentGameState } from './gameState';
import { isStartedGameState } from '../shared/predicates';

const startGame = () => {
  const startGameMessage: StartGameMessage = {
    action: SendableWorkerActions.START_GAME,
  };
  sendMessageToWorker(startGameMessage);
};
const addStartListener = () => {
  const startGameButton = getSplashStartElement();
  startGameButton.addEventListener('click', () => {
    startGame();

    renderSwitchHud(HudState.GAME);
    renderSplashAnimate();
  });
};
const addContinueListener = () => {
  const continueButtonElement = getSplashContinueElement();
  continueButtonElement.addEventListener('click', () => {
    const continueGameMessage: ContinueGameMessage = {
      action: SendableWorkerActions.CONTINUE_GAME,
    };
    sendMessageToWorker(continueGameMessage);
    renderSwitchHud(HudState.GAME);
    renderBattleReady(true);
    renderSplashAnimate();
  });
};
const addRestartListener = () => {
  const restartGameButton = getRestartElement();
  restartGameButton.addEventListener('click', () => {
    startGame();
  });
};

const addOpenShopListener = () => {
  const shopButton = getOpenShopElement();
  shopButton.addEventListener('click', () => {
    renderOpenShop();
  });
};

const addCloseShopListener = () => {
  const shopButton = getCloseShopElement();
  shopButton.addEventListener('click', () => {
    renderCloseShop();
  });
};

const addStartBattleListener = () => {
  const battleReadyElement = getStartBattleElement();
  battleReadyElement.addEventListener('click', () => {
    console.debug('Starting battle');

    renderHidePlantPickerElement();
    renderHidePlantSalesElement();
    const startBattleMessage: FindOpponentMessage = {
      action: SendableWorkerActions.FIND_OPPONENT,
    };
    sendMessageToWorker(startBattleMessage);
  });
};

const addEndBattleListener = () => {
  const battleEndElement = getEndBattleElement();
  battleEndElement.addEventListener('click', async () => {
    console.debug('Ending battle');
    const gameState = getCurrentGameState();
    console.log(gameState);
    if ( !isStartedGameState(gameState) ) {
      throw new Error('Trying to end battle without started game state');
    }

    const battleEndedContainer = getBattleEndedContainerElement();
    battleEndedContainer.classList.add('battle-ended__container--hidden');

    renderSwitchHud(HudState.GAME);

    renderHidePlantPickerElement();
    renderHidePlantSalesElement();
    if ( gameState.battleStats.livesLeft <= 0 ) {
      return startGame();
    }
    renderShopShelve();
    renderBuyableCells(gameState);
  });
};

const addSellPlantListener = () => {
  const sellPlantButton = getPlantSalesButtonElement();
  sellPlantButton.addEventListener('click', () => {
    const cellIndex = Number(sellPlantButton.parentElement!.dataset.cellIndex);
    if ( Number.isNaN(cellIndex) ) {
      throw new Error('Invalid cell index');
    }

    renderHidePlantSalesElement();
    const sellPlantMessage: SellPlantMessage = {
      action: SendableWorkerActions.SELL_PLANT,
      value: { cellIndex },
    };
    sendMessageToWorker(sellPlantMessage);
  });
};

const addPopoversListener = () => {
  const gameField = getGameField(true);
  document.addEventListener('click', (evt) => {
    if ( evt.target === gameField.parentElement ) {
      renderHidePlantPickerElement();
      renderHidePlantSalesElement();
    }
  });
  const shopElement = getShopElement();
  shopElement.addEventListener('click', () => {
    const descriptions = document.querySelectorAll('.item__description-container--expanded');
    console.log(descriptions);
    descriptions.forEach((description) => {
      description.classList.remove('item__description-container--expanded');
    })
  });
};

const addWindowResizeListener = () => {
  window.addEventListener('resize', () => {
    renderScaleField();
  });
};
export const initializeHud = () => {
  addWindowResizeListener();
  addStartListener();
  addContinueListener();
  addRestartListener();
  addOpenShopListener();
  addCloseShopListener();
  addStartBattleListener();
  addEndBattleListener();
  addSellPlantListener();
  addPopoversListener();
  renderVersion();
};

