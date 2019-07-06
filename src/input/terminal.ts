const readline = require('readline');

import { INPUT_TYPES } from './constants';

const setupInputListeners = ({ handleInput }) => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {
      switch (key.name) {
        case 'left':
          handleInput(INPUT_TYPES.INPUT_LEFT);
          break;
        case 'right':
          handleInput(INPUT_TYPES.INPUT_RIGHT);
          break;
        case 'up':
          handleInput(INPUT_TYPES.INPUT_UP);
          break;
        case 'down':
          handleInput(INPUT_TYPES.INPUT_DOWN);
          break;
        case 'q':
          handleInput(INPUT_TYPES.ROTATE_REVERSE);
          break;
        case 'e':
          handleInput(INPUT_TYPES.ROTATE);
          break;
      }
    }
  });
};

export default setupInputListeners;
