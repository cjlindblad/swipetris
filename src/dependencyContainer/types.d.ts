import { ISetupInputListeners } from '../input/types';
import { IGameCharSelector } from '../config/types';

interface RenderDependency {
  render?: IRender;
}

interface SetupInputListenersDependency {
  setupInputListeners?: ISetupInputListeners;
}

interface GameCharSelectorDependency {
  gameCharSelector?: IGameCharSelector;
}

// hard coded for now.
// we want to make this dynamic.
export type Dependencies = RenderDependency &
  SetupInputListenersDependency &
  GameCharSelectorDependency;
