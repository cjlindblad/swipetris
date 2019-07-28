import DependencyContainer from '../dependencyContainer';
import initializeMenu from '../scenes/menu';
import { ISetupInputListeners } from '../input/types';
import initializeSceneController from '../scenes/sceneController';
import { SceneTransitionMapping } from '../scenes/types';
import { SceneTransition } from './enums';
import { initializeGameState } from '../scenes/gameState';
import initializeOptions from '../scenes/options';

const initializeGame = () => {
  // resolve dependencies
  const render = DependencyContainer.resolve('render') as IRender; // TODO should be automatic
  const setupInputListeners = DependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic

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
    render,
    initializeMenu,
    sceneTransitions
  );
  setupInputListeners({ handleInput: sceneController.handleInput });
};

export default initializeGame;
