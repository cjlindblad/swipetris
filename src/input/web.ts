import { INPUT_TYPE } from './enums';
import { SetupInputListenersParam } from './types';

const setupInputListeners = (param: SetupInputListenersParam): void => {
  const { handleInput } = param;

  // will probably break with multi touch.
  let touches: Touch[] = [];

  function getInputType(dx: number, dy: number, clientX: number): INPUT_TYPE {
    if (dx === 0 && dy === 0) {
      // tap
      // determine position on screen
      if (clientX > window.innerWidth / 2) {
        return INPUT_TYPE.ROTATE;
      } else {
        return INPUT_TYPE.ROTATE_REVERSE;
      }
    }

    const horizontalSwipe = Math.abs(dx) > Math.abs(dy);
    if (horizontalSwipe) {
      if (dx > 0) {
        return INPUT_TYPE.INPUT_RIGHT;
      } else {
        return INPUT_TYPE.INPUT_LEFT;
      }
    } else {
      if (dy > 0) {
        return INPUT_TYPE.INPUT_DOWN;
      } else {
        return INPUT_TYPE.INPUT_UP;
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    // event key codes
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;
    const Q = 81;
    const E = 69;
    const SPACE = 32;
    const ENTER = 13;

    const inputMapping: {
      [index: number]: INPUT_TYPE;
    } = {
      [LEFT]: INPUT_TYPE.INPUT_LEFT,
      [RIGHT]: INPUT_TYPE.INPUT_RIGHT,
      [UP]: INPUT_TYPE.INPUT_UP,
      [DOWN]: INPUT_TYPE.INPUT_DOWN,
      [E]: INPUT_TYPE.ROTATE,
      [Q]: INPUT_TYPE.ROTATE_REVERSE,
      [SPACE]: INPUT_TYPE.GRAVITY_DROP,
      [ENTER]: INPUT_TYPE.CONFIRMATION
    };

    const inputType = inputMapping[event.keyCode];
    if (inputType !== undefined) {
      handleInput(inputMapping[event.keyCode]);
    }
  }

  function handleTouchStart(event: TouchEvent): void {
    touches.push(event.touches[0]);
  }

  function handleTouchMove(event: TouchEvent): void {
    touches.push(event.touches[0]);
  }

  function handleTouchEnd(): void {
    const initialTouch = touches[0];
    const lastTouch = touches[touches.length - 1];

    const dx = lastTouch.pageX - initialTouch.pageX;
    const dy = lastTouch.pageY - initialTouch.pageY;

    const inputType = getInputType(dx, dy, lastTouch.clientX);
    handleInput(inputType);

    touches = [];
  }

  function handleTouchCancel(): void {
    // not really sure when this is triggered. delegate it to touch end handler for now.
    handleTouchEnd();
  }

  const element = document.getElementById('wrapper');

  if (!element) {
    throw new Error('Element did not exist');
  }

  // swipe listeners
  element.addEventListener('touchstart', handleTouchStart, false);
  element.addEventListener('touchend', handleTouchEnd, false);
  element.addEventListener('touchcancel', handleTouchCancel, false);
  element.addEventListener('touchmove', handleTouchMove, false);

  // why not key listeners as well?
  element.addEventListener('keydown', handleKeyDown, false);
};

export default setupInputListeners;
