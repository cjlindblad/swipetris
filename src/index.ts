import DependencyContainer from './dependencyContainer';
import { WEB_ENV, TERMINAL_ENV, createGameCharSelector } from './config';
import { Dependencies } from './dependencyContainer/types';
import initializeGame from './game';

export const main = async (GAME_ENV: string) => {
  // register dependencies
  let dependencies: Dependencies;
  switch (GAME_ENV) {
    case WEB_ENV:
      dependencies = {
        render: (await import('./render/web')).default,
        setupInputListeners: (await import('./input/web')).default,
        gameCharSelector: createGameCharSelector(WEB_ENV)
      };
      break;
    case TERMINAL_ENV:
      dependencies = {
        render: (await import('./render/terminal')).default,
        setupInputListeners: (await import('./input/terminal')).default,
        gameCharSelector: createGameCharSelector(TERMINAL_ENV)
      };
      break;
    default:
      throw new Error(`Unknown game environment - ${GAME_ENV}`);
  }
  new DependencyContainer(dependencies);

  // initialize game
  initializeGame();
};
