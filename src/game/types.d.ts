import { HandleInput } from '../input/types';
import { SceneTransition } from './enums';

interface IChangeScene {
  (sceneTransition: SceneTransition): void;
}

interface IScene {
  handleInput: HandleInput;
}
