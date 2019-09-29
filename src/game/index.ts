import DependencyContainer from '../dependencyContainer';
import initializeMenu from '../scenes/menu';
import initializeSceneController from '../scenes/sceneController';
import initializeGameOptions from '../options';
import { SceneTransitionMapping } from '../scenes/types';
import { SceneTransition } from './enums';
import { initializeGameState } from '../scenes/gameState';
import initializeOptions from '../scenes/options';
import initializeHighScore from '../scenes/highScore';
import createEventDispatcher from '../eventDispatcher';
import { EventType } from '../eventDispatcher/enums';
import { SetupInputListeners } from '../input/types';

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
    },
    {
      transition: SceneTransition.GameToStart,
      initializer: initializeMenu
    },
    {
      transition: SceneTransition.StartToHighScore,
      initializer: initializeHighScore
    },
    {
      transition: SceneTransition.HighScoreToStart,
      initializer: initializeMenu
    },
    {
      transition: SceneTransition.GameToHighScore,
      initializer: initializeHighScore
    }
  ];

  // create event dispatcher
  const eventDispatcher = createEventDispatcher();

  const options = initializeGameOptions();
  eventDispatcher.register(options.eventClient);

  initializeSceneController(
    initializeMenu,
    sceneTransitions,
    eventDispatcher,
    options.options
  );

  // map inputs to dispatch events
  const dispatchInputEvent = (eventType: EventType): void => {
    eventDispatcher.dispatch({
      type: eventType
    });
  };

  setupInputListeners({ handleInput: dispatchInputEvent });
};

export default initializeGame;
