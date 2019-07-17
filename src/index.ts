import { initializeGameState } from './gameState';
import DependencyContainer from './dependencyContainer';
import { WEB_ENV, TERMINAL_ENV, createGameCharSelector } from './config';
import { INPUT_TYPE } from './input/enums';
import { ISetupInputListenersParam, ISetupInputListeners } from './input/types';
import { Dependencies } from './dependencyContainer/types';

export const main = async (GAME_ENV: string) => {
  // dependency injection
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
  const dependencyContainer = new DependencyContainer(dependencies);

  const gameState = initializeGameState(dependencyContainer.resolve(
    'render'
  ) as IRender); // TODO should be automatic

  // "controller" that forwards input to game logic
  const handleInput = (input: INPUT_TYPE) => {
    gameState.handleInput(input);
  };

  const inputListenerOptions: ISetupInputListenersParam = {
    handleInput,
    element: null
  };
  if (GAME_ENV === WEB_ENV) {
    const html = document.getElementById('wrapper');
    inputListenerOptions.element = html;
  }

  const setupInputListeners = dependencyContainer.resolve(
    'setupInputListeners'
  ) as ISetupInputListeners; // TODO should be automatic

  setupInputListeners(inputListenerOptions);
};
