import DependencyContainer from '../dependencyContainer';
import initializeMenu from '../scenes/menu';
import { SetupInputListeners } from '../input/types';
import initializeSceneController from '../scenes/sceneController';
import { SceneTransitionMapping } from '../scenes/types';
import { SceneTransition } from './enums';
import { initializeGameState } from '../scenes/gameState';
import initializeOptions from '../scenes/options';

const initializeGame = (): void => {
  // resolve dependencies
  const setupInputListeners = DependencyContainer.resolve(
    'setupInputListeners'
  ) as SetupInputListeners; // TODO should be automatic

  const sceneTransitions: SceneTransitionMapping[] = [
    {
      transition: SceneTransition.StartToGame,
      initializer: initializeGameState
    },
    {
      transition: SceneTransition.StartToOptions,
      initializer: initializeOptions
    },
    {
      transition: SceneTransition.OptionsToStart,
      initializer: initializeMenu
    }
  ];

  const sceneController = initializeSceneController(
    initializeMenu,
    sceneTransitions
  );
  setupInputListeners({ handleInput: sceneController.handleInput });
};

export default initializeGame;
