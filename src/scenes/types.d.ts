import { IChangeScene, IScene } from '../game/types';

interface SceneInitializer {
  (render: IRender, changeScene: IChangeScene): IScene;
}
