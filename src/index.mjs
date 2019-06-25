import { initializeGameState } from './gameState.mjs';
import DependencyContainer from './dependencyContainer.mjs';

export const main = async GAME_ENV => {
  // dependency injection
  let dependencies = {};
  switch (GAME_ENV) {
    case 'web':
      dependencies['render'] = (await import('./render/web.mjs')).default;
      dependencies['setupInputListeners'] = (await import(
        './input/web.mjs'
      )).default;
      break;
    case 'terminal':
      dependencies['render'] = (await import('./render/terminal.mjs')).default;
      dependencies['setupInputListeners'] = (await import(
        './input/terminal.mjs'
      )).default;
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
    handleInput
  };
  if (GAME_ENV === 'web') {
    const html = document.getElementById('wrapper');
    inputListenerOptions.element = html;
  }

  dependencyContainer.resolve('setupInputListeners')(inputListenerOptions);
};
