import { IScene, IChangeScene } from '../game/types';
import { HandleInput } from '../input/types';
import { SceneTransition } from '../game/enums';
import { SceneInitializer, SceneTransitionMapping } from './types';

const initializeSceneController = (
  startingSceneInitializer: SceneInitializer,
  sceneTransitions: SceneTransitionMapping[]
) => {
  let activeScene: IScene;

  const changeScene: IChangeScene = (sceneTransition: SceneTransition) => {
    const sceneTransitionMapping:
      | SceneTransitionMapping
      | undefined = sceneTransitions.find(
      e => e.transition === sceneTransition
    );

    if (!sceneTransitionMapping) {
      throw new Error('No scene initializer found');
    }

    activeScene = sceneTransitionMapping.initializer(changeScene);
  };

  const handleInput: HandleInput = input => {
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
