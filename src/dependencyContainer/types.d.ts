import { GameCharSelector } from '../config/types';
import { SetupInputListeners } from '../input/types';
import { Render } from '../render/types';

interface Dependencies {
  render?: Render;
  setupInputListeners?: SetupInputListeners;
  gameCharSelector?: GameCharSelector;
  highScore?: HighScore;
}
