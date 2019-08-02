import { SceneTransition } from './enums';
import { DispatchEvent } from '../eventDispatcher/types';

interface ChangeScene {
  (sceneTransition: SceneTransition): void;
}

interface Scene {
  handleEvent(event: DispatchEvent): void;
}
