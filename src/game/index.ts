import DependencyContainer from '../dependencyContainer';
import initializeMenu from '../scenes/menu';
import { ISetupInputListeners } from '../input/types';
import createInputController from '../input/inputController';
import initializeSceneController from '../scenes/sceneController';

const initializeGame = () => {
  // resolve dependencies
  const render = DependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = DependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic

  // setup input controller
  const inputController = createInputController();
  setupInputListeners({ handleInput: inputController.handleInput });

  initializeSceneController(render, inputController, initializeMenu);
};

export default initializeGame;
