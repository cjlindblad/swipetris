import { GameCharSelector } from '../config/types';
import { SetupInputListeners } from '../input/types';
import { Render } from '../render/types';
import { HighScore } from '../highScore/types';

interface Dependencies {
  render?: Render;
  setupInputListeners?: SetupInputListeners;
  gameCharSelector?: GameCharSelector;
  highScore?: HighScore;
}
