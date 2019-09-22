import { ChangeScene, Scene } from '../game/types';
import { SceneTransition } from '../game/enums';
import { Dispatch } from '../eventDispatcher/types';
import { Options } from '../options/types';

interface MenuItem {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
}

interface SceneController {
  changeScene: ChangeScene;
}

interface SceneInitializer {
  (param: InitializerParam): Scene;
}

interface InitializerParam {
  changeScene: ChangeScene;
  dispatch: Dispatch;
  options: Options;
}

interface ChangeScene {
  (changeScene: ChangeScene): Scene;
}

interface SceneTransitionMapping {
  transition: SceneTransition;
  initializer: SceneInitializer;
}
