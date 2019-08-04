import { Scene, ChangeScene } from '../game/types';
import {
  SceneInitializer,
  SceneTransitionMapping,
  SceneController
} from './types';
import { EventDispatcher, UnregisterCallback } from '../eventDispatcher/types';
import { EventType } from '../eventDispatcher/enums';

const initializeSceneController = (
  startingSceneInitializer: SceneInitializer,
  sceneTransitions: SceneTransitionMapping[],
  eventDispatcher: EventDispatcher
): SceneController => {
  let activeScene: Scene;
  let unregisterCallback: UnregisterCallback;

  const changeScene: ChangeScene = sceneTransition => {
    const sceneTransitionMapping:
      | SceneTransitionMapping
      | undefined = sceneTransitions.find(
      (e): boolean => e.transition === sceneTransition
    );

    if (!sceneTransitionMapping) {
      throw new Error('No scene initializer found');
    }

    activeScene = sceneTransitionMapping.initializer({
      changeScene,
      dispatch: eventDispatcher.dispatch
    });
    if (unregisterCallback) {
      unregisterCallback();
    }
    unregisterCallback = eventDispatcher.register(activeScene);

    // TODO FIX THIS. We don't want to start gravity on every scene.
    // initial gravity
    eventDispatcher.dispatch({ type: EventType.StartGravityInterval });
  };

  // create first scene
  activeScene = startingSceneInitializer({
    changeScene,
    dispatch: eventDispatcher.dispatch
  });
  unregisterCallback = eventDispatcher.register(activeScene);

  return {
    changeScene
  };
};

export default initializeSceneController;
