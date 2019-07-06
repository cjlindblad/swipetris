import { initializeGameState } from './gameState';
import DependencyContainer from './dependencyContainer';
import { WEB_ENV, TERMINAL_ENV, createGameCharSelector } from './config';

export const main = async GAME_ENV => {
  // dependency injection
  let dependencies = {};
  switch (GAME_ENV) {
    case WEB_ENV:
      dependencies['render'] = (await import('./render/web')).default;
      dependencies['setupInputListeners'] = (await import(
        './input/web'
      )).default;
      dependencies['gameCharSelector'] = createGameCharSelector(WEB_ENV);
      break;
    case TERMINAL_ENV:
      dependencies['render'] = (await import('./render/terminal')).default;
      dependencies['setupInputListeners'] = (await import(
        './input/terminal'
      )).default;
      dependencies['gameCharSelector'] = createGameCharSelector(TERMINAL_ENV);
      break;
    default:
      throw new Error(`Unknown game environment - ${GAME_ENV}`);
  }
  const dependencyContainer = new DependencyContainer(dependencies);

  const gameState = initializeGameState(dependencyContainer.resolve('render'));

  // "controller" that forwards input to game logic
  const handleInput = input => {
    gameState.handleInput(input);
  };

  const inputListenerOptions = {
    handleInput,
    element: null
  };
  if (GAME_ENV === WEB_ENV) {
    const html = document.getElementById('wrapper');
    inputListenerOptions.element = html;
  }

  dependencyContainer.resolve('setupInputListeners')(inputListenerOptions);
};
