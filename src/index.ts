import DependencyContainer from './dependencyContainer';
import { WEB_ENV, TERMINAL_ENV, createGameCharSelector } from './config';
import { Dependencies } from './dependencyContainer/types';
import initializeGame from './game';

export const main = async (GAME_ENV: string): Promise<void> => {
  // register dependencies
  let dependencies: Dependencies;
  switch (GAME_ENV) {
    case WEB_ENV:
      dependencies = {
        render: (await import('./render/web')).default(),
        setupInputListeners: (await import('./input/web')).default,
        gameCharSelector: createGameCharSelector(WEB_ENV),
        highScore: (await import('./highScore/web')).default
      };
      break;
    case TERMINAL_ENV:
      dependencies = {
        render: (await import('./render/terminal')).default,
        setupInputListeners: (await import('./input/terminal')).default,
        gameCharSelector: createGameCharSelector(TERMINAL_ENV),
        highScore: (await import('./highScore/terminal')).default
      };
      break;
    default:
      throw new Error(`Unknown game environment - ${GAME_ENV}`);
  }
  DependencyContainer.initialize(dependencies);

  initializeGame();
};
