import DependencyContainer from '../dependencyContainer';
import { initializeGameState } from '../gameState';
import initializeMenu from '../menu';
import { ISetupInputListeners } from '../input/types';
import createInputController from '../input/inputController';
import { IGameCharSelector } from '../config/types';

const initializeGame = () => {
  // resolve dependencies
  const render = DependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = DependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic
  const gameCharSelector = DependencyContainer.resolve(
    'gameCharSelector'
  ) as IGameCharSelector; // TODO should be automatic

  // TODO generalize for different scenes
  // const gameState = initializeGameState(render, gameCharSelector);
  const menu = initializeMenu(render);

  // setup input controller
  const inputController = createInputController();
  // inputController.register(gameState);
  inputController.register(menu);
  setupInputListeners({ handleInput: inputController.handleInput });
};

export default initializeGame;
