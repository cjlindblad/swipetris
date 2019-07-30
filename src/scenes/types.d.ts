import { ChangeScene, Scene } from '../game/types';
import { SceneTransition } from '../game/enums';
import { HandleInput } from '../input/types';

interface MenuItem {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
}

interface SceneController {
  handleInput: HandleInput;
  changeScene: ChangeScene;
}

interface SceneInitializer {
  (changeScene: ChangeScene): Scene;
}

interface SceneTransitionMapping {
  transition: SceneTransition;
  initializer: SceneInitializer;
}
