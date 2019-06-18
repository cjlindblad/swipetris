import { initializeGameState } from './gameState.mjs';

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
}

main();
