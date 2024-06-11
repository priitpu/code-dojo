import { Game } from './game';
import { getSaveState, setSaveState } from './game/base/serialized';
import './style.css';

async function init() {
  const game = new Game();
  await game.preload();

  game.mount(document.getElementById('app') as HTMLElement);

  const savestate = getSaveState();
  if (savestate) {
    game.deserialize(savestate);
  }

  setInterval(() => setSaveState(game.serialize()), 5000);

  game.start();
}

init().catch(console.error);
