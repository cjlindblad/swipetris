import { IChangeScene, IScene } from '../game/types';

interface MenuItem {
  text: string;
  action: any;
}

interface SceneInitializer {
  (render: IRender, changeScene: IChangeScene): IScene;
}
