import { ISetupInputListeners } from '../input/types';
import { IGameCharSelector } from '../config/types';

interface Dependencies {
  render?: IRender;
  setupInputListeners?: ISetupInputListeners;
  gameCharSelector?: IGameCharSelector;
}
