import { initializeGameState } from './gameState.mjs';

export const main = async GAME_ENV => {
  let setupInputListeners;
  let render;

  // some crude sort of dependency injection
  switch (GAME_ENV) {
    case 'web':
      setupInputListeners = (await import('./input/web.mjs')).default;
      render = (await import('./render/web.mjs')).default;
      break;
    case 'terminal':
      setupInputListeners = (await import('./input/terminal.mjs')).default;
      render = (await import('./render/terminal.mjs')).default;
      break;
    default:
      throw new Error(`Unknown game environment - ${GAME_ENV}`);
  }

  const gameState = initializeGameState(render);

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

  setupInputListeners(inputListenerOptions);
};
