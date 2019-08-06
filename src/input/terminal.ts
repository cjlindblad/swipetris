import readline = require('readline');
import { EventType } from '../eventDispatcher/enums';
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
            handleInput(EventType.InputLeft);
            break;
          case 'right':
            handleInput(EventType.InputRight);
            break;
          case 'up':
            handleInput(EventType.InputUp);
            break;
          case 'down':
            handleInput(EventType.InputDown);
            break;
          case 'q':
            handleInput(EventType.RotateReverse);
            break;
          case 'e':
            handleInput(EventType.Rotate);
            break;
          case 'r':
            handleInput(EventType.Restart);
            break;
          case 'return':
            handleInput(EventType.Confirmation);
            break;
        }
      }
    }
  );
};

export default setupInputListeners;
