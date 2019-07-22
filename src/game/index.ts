import DependencyContainer from '../dependencyContainer';
import { initializeGameState } from '../gameState';
import { ISetupInputListeners } from '../input/types';
import createInputController from '../input/inputController';

const initializeGame = () => {
  // resolve dependencies
  const render = DependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = DependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic

  // TODO generalize for different scenes
  const gameState = initializeGameState(render);

  // setup input controller
  const inputController = createInputController();
  inputController.register(gameState);

  setupInputListeners({ handleInput: inputController.handleInput });
};

export default initializeGame;
