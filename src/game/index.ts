import DependencyContainer from '../dependencyContainer';
import { initializeGameState } from '../scenes/gameState';
import initializeMenu from '../scenes/menu';
import { ISetupInputListeners, UnregisterInputHandler } from '../input/types';
import createInputController from '../input/inputController';
import { IGameCharSelector } from '../config/types';
import { IChangeScreen } from './types';
import { ScreenTransition } from './enums';

const initializeGame = () => {
  // resolve dependencies
  const render = DependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = DependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic
  const gameCharSelector = DependencyContainer.resolve(
    'gameCharSelector'
  ) as IGameCharSelector; // TODO should be automatic

  // TODO generalize this

  // setup input controller
  const inputController = createInputController();
  setupInputListeners({ handleInput: inputController.handleInput });

  let activeScene;
  let unregisterPreviousInput: UnregisterInputHandler;
  const changeScreen: IChangeScreen = (screenTransition: ScreenTransition) => {
    switch (screenTransition) {
      case ScreenTransition.StartToGame:
        // TODO check if active scene is start
        activeScene = initializeGameState(render, gameCharSelector);
        unregisterPreviousInput();
        unregisterPreviousInput = inputController.register(activeScene);
        break;
    }
  };
  activeScene = initializeMenu(render, changeScreen);
  unregisterPreviousInput = inputController.register(activeScene);
};

export default initializeGame;
