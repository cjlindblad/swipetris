import DependencyContainer from '../dependencyContainer';
import { initializeGameState } from '../scenes/gameState';
import initializeMenu from '../scenes/menu';
import initializeOptions from '../scenes/options';
import { ISetupInputListeners, UnregisterInputHandler } from '../input/types';
import createInputController from '../input/inputController';
import { IChangeScene } from './types';
import { SceneTransition } from './enums';
import { SceneInitializer } from '../scenes/types';

const initializeGame = () => {
  // resolve dependencies
  const render = DependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = DependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic

  // setup input controller
  const inputController = createInputController();
  setupInputListeners({ handleInput: inputController.handleInput });

  let activeScene;
  let unregisterPreviousInput: UnregisterInputHandler;

  const sceneTransitionMapping = {
    [SceneTransition.StartToGame]: initializeGameState,
    [SceneTransition.StartToOptions]: initializeOptions,
    [SceneTransition.OptionsToStart]: initializeMenu
  };

  const changeScene: IChangeScene = (sceneTransition: SceneTransition) => {
    const sceneInitializer: SceneInitializer =
      sceneTransitionMapping[sceneTransition];

    if (!sceneInitializer) {
      throw new Error('No scene initializer found');
    }

    activeScene = sceneInitializer(render, changeScene);
    unregisterPreviousInput();
    unregisterPreviousInput = inputController.register(activeScene);
  };

  activeScene = initializeMenu(render, changeScene);
  unregisterPreviousInput = inputController.register(activeScene);
};

export default initializeGame;
