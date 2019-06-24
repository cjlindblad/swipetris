import { initializeGameState } from './gameState.mjs';
import DependencyContainer from './dependencyContainer.mjs';

export const main = async GAME_ENV => {
  const dependencyContainer = new DependencyContainer();

  // some crude sort of dependency injection
  switch (GAME_ENV) {
    case 'web':
      dependencyContainer.register(
        'render',
        (await import('./render/web.mjs')).default
      );
      dependencyContainer.register(
        'setupInputListeners',
        (await import('./input/web.mjs')).default
      );
      break;
    case 'terminal':
      dependencyContainer.register(
        'render',
        (await import('./render/terminal.mjs')).default
      );
      dependencyContainer.register(
        'setupInputListeners',
        (await import('./input/terminal.mjs')).default
      );
      break;
    default:
      throw new Error(`Unknown game environment - ${GAME_ENV}`);
  }

  const gameState = initializeGameState(dependencyContainer.resolve('render'));

  // "controller" that forwards input to game logic
  const handleInput = input => {
    gameState.handleInput(input);
  };

  const inputListenerOptions = {
    handleInput
  };
  if (GAME_ENV === 'web') {
    const html = document.getElementById('wrapper');
    inputListenerOptions.element = html;
  }

  dependencyContainer.resolve('setupInputListeners')(inputListenerOptions);
};
