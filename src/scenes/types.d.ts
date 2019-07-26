import { IChangeScreen, IScene } from '../game/types';

interface ScreenInitializer {
  (render: IRender, changeScreen: IChangeScreen): IScene;
}
