import DependencyContainer from '../dependencyContainer';
import { initializeGameState } from '../gameState';
import { ISetupInputListeners } from '../input/types';
import createInputController from '../input/inputController';

const initializeGame = () => {
  // resolve dependencies
  const dependencyContainer = new DependencyContainer();
  const render = dependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = dependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic

  // TODO generalize for different scenes
  // maybe create some general input handler
  const gameState = initializeGameState(render);

  // setup input controller
  const inputController = createInputController();
  inputController.register(gameState);

  setupInputListeners({ handleInput: inputController.handleInput });
};

export default initializeGame;
