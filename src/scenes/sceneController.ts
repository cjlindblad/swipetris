import { IScene, IChangeScene } from '../game/types';
import { UnregisterInputHandler, InputController } from '../input/types';
import { SceneTransition } from '../game/enums';
import { initializeGameState } from './gameState';
import initializeOptions from './options';
import initializeMenu from './menu';
import { SceneInitializer } from './types';

// TODO write unit test
// TODO do we want to pass render and input controller?
// TODO take a look at the control flow
const initializeSceneController = (
  render: IRender,
  inputController: InputController,
  startingSceneInitializer: SceneInitializer
) => {
  let activeScene: IScene;
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

  // create first scene
  activeScene = startingSceneInitializer(render, changeScene);
  unregisterPreviousInput = inputController.register(activeScene);
};

export default initializeSceneController;
