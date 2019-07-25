import { HandleInput } from '../input/types';
import { ScreenTransition } from './enums';

interface IChangeScreen {
  (screenTransition: ScreenTransition): void;
}

interface IScene {
  handleInput: HandleInput;
}
