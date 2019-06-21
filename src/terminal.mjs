import { initializeGameState } from './gameState.mjs';
import { setupInputListeners } from './input/terminal.mjs';

function render({ renderString, nextPieceChar }) {
  for (let i = 0; i < 14; i++) {
    console.log('\r\n');
  }
  console.log('next: ' + nextPieceChar);
  console.log();
  console.log(renderString);
}

function main() {
  const gameState = initializeGameState(render);

  // "controller" that forwards input to game logic
  const handleInput = input => {
    gameState.handleInput(input);
  };

  setupInputListeners({ handleInput });
}

main();
