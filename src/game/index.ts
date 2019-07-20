import DependencyContainer from '../dependencyContainer';
import { initializeGameState } from '../gameState';
import { INPUT_TYPE } from '../input/enums';
import {
  ISetupInputListenersParam,
  ISetupInputListeners
} from '../input/types';

const initializeGame = () => {
  // resolve dependencies
  const dependencyContainer = new DependencyContainer();
  const render = dependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = dependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic

  // maybe create some general input handler
  const gameState = initializeGameState(render);
  const handleInput = (input: INPUT_TYPE) => {
    gameState.handleInput(input);
  };
  const inputListenerOptions: ISetupInputListenersParam = {
    handleInput
  };
  setupInputListeners(inputListenerOptions);

  // TODO generalize for different scenes
};

export default initializeGame;
