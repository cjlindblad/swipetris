import { HandleInput } from '../input/types';
import { SceneTransition } from './enums';

interface ChangeScene {
  (sceneTransition: SceneTransition): void;
}

interface Scene {
  handleInput: HandleInput;
}
