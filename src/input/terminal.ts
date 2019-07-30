import readline = require('readline');

import { INPUT_TYPE } from './enums';
import { SetupInputListenersParam } from './types';

const setupInputListeners = (param: SetupInputListenersParam): void => {
  const { handleInput } = param;
  readline.emitKeypressEvents(process.stdin);

  if (
    process === undefined ||
    process.stdin === undefined ||
    process.stdin.setRawMode === undefined
  ) {
    throw new Error('Unexpected undefined object');
  }
  process.stdin.setRawMode(true);

  process.stdin.on(
    'keypress',
    (_, key): void => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      } else {
        switch (key.name) {
          case 'left':
            handleInput(INPUT_TYPE.INPUT_LEFT);
            break;
          case 'right':
            handleInput(INPUT_TYPE.INPUT_RIGHT);
            break;
          case 'up':
            handleInput(INPUT_TYPE.INPUT_UP);
            break;
          case 'down':
            handleInput(INPUT_TYPE.INPUT_DOWN);
            break;
          case 'q':
            handleInput(INPUT_TYPE.ROTATE_REVERSE);
            break;
          case 'e':
            handleInput(INPUT_TYPE.ROTATE);
            break;
          case 'return':
            handleInput(INPUT_TYPE.CONFIRMATION);
            break;
        }
      }
    }
  );
};

export default setupInputListeners;
