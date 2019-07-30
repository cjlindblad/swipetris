import { Scene, ChangeScene } from '../game/types';
import { HandleInput } from '../input/types';
import { SceneTransition } from '../game/enums';
import {
  SceneInitializer,
  SceneTransitionMapping,
  SceneController
} from './types';

const initializeSceneController = (
  startingSceneInitializer: SceneInitializer,
  sceneTransitions: SceneTransitionMapping[]
): SceneController => {
  let activeScene: Scene;

  const changeScene: ChangeScene = (sceneTransition: SceneTransition): void => {
    const sceneTransitionMapping:
      | SceneTransitionMapping
      | undefined = sceneTransitions.find(
      (e): boolean => e.transition === sceneTransition
    );

    if (!sceneTransitionMapping) {
      throw new Error('No scene initializer found');
    }

    activeScene = sceneTransitionMapping.initializer(changeScene);
  };

  const handleInput: HandleInput = (input): void => {
    activeScene.handleInput(input);
  };

  // create first scene
  activeScene = startingSceneInitializer(changeScene);

  return {
    handleInput,
    changeScene
  };
};

export default initializeSceneController;
