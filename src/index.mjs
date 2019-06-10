import { setupInputListeners } from './inputHandling.mjs';

import { initializeGameState } from './gameState.mjs';

function render({ renderString, nextPieceChar }) {
  const label = document.getElementById('input');
  label.innerText = renderString;
  const next = document.getElementById('next');
  next.innerText = nextPieceChar;
}

function main() {
  const gameState = initializeGameState();

  // "controller" that forwards input to game logic
  const handleInput = input => {
    gameState.handleInput(input);
    render(gameState.getRepresentation());
  };

  const html = document.getElementById('wrapper');
  setupInputListeners(html, handleInput);

  render(gameState.getRepresentation());
}

// startup
main();
