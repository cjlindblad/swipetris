import { INPUT_TYPE } from './enums';
import { ISetupInputListenersParam } from './types';

const setupInputListeners = (param: ISetupInputListenersParam): void => {
  const { handleInput } = param;

  // will probably break with multi touch.
  let touches: Touch[] = [];

  const element = document.getElementById('wrapper');

  // swipe listeners
  element!.addEventListener('touchstart', handleTouchStart, false);
  element!.addEventListener('touchend', handleTouchEnd, false);
  element!.addEventListener('touchcancel', handleTouchCancel, false);
  element!.addEventListener('touchmove', handleTouchMove, false);

  // why not key listeners as well?
  element!.addEventListener('keydown', handleKeyDown, false);

  function handleKeyDown(event: KeyboardEvent): void {
    // some key codes
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    // rotation keys
    const Q = 81;
    const E = 69;

    // temp gravity key
    const SPACE = 32;

    if (event.keyCode === LEFT) {
      handleInput(INPUT_TYPE.INPUT_LEFT);
    }
    if (event.keyCode === RIGHT) {
      handleInput(INPUT_TYPE.INPUT_RIGHT);
    }
    if (event.keyCode === UP) {
      handleInput(INPUT_TYPE.INPUT_UP);
    }
    if (event.keyCode === DOWN) {
      handleInput(INPUT_TYPE.INPUT_DOWN);
    }
    if (event.keyCode === E) {
      handleInput(INPUT_TYPE.ROTATE);
    }
    if (event.keyCode === Q) {
      handleInput(INPUT_TYPE.ROTATE_REVERSE);
    }
    if (event.keyCode === SPACE) {
      handleInput(INPUT_TYPE.GRAVITY_DROP);
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

  function handleTouchCancel(): void {
    // not really sure when this is triggered. delegate it to touch end handler for now.
    handleTouchEnd();
  }
};

export default setupInputListeners;
