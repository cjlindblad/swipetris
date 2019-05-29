import { setupInputListeners } from './inputHandling.mjs';

function main() {
  const html = document.getElementById('wrapper');
  setupInputListeners(html);
}

// startup
main();