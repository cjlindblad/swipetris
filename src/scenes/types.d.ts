import { IChangeScene, IScene } from '../game/types';
import { SceneTransition } from '../game/enums';

interface MenuItem {
  text: string;
  action: any;
}

interface SceneInitializer {
  (changeScene: IChangeScene): IScene;
}

interface SceneTransitionMapping {
  transition: SceneTransition;
  initializer: SceneInitializer;
}
