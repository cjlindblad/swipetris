const readline = require('readline');

import { INPUT_TYPE } from './enums';
import { ISetupInputListenersParam } from './types';

const setupInputListeners = (param: ISetupInputListenersParam): void => {
  const { handleInput } = param;
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode!(true);
  process.stdin.on('keypress', (_, key) => {
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
      }
    }
  });
};

export default setupInputListeners;
