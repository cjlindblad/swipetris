import { setupInputListeners } from './inputHandling.mjs';

import { initializeGameState } from './gameState.mjs';

function main() {
  const html = document.getElementById('wrapper');
  setupInputListeners(html);

  initializeGameState();
}

// startup
main();
