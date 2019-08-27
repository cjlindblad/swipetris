import { EventType } from '../eventDispatcher/enums';
import { SetupInputListenersParam } from './types';

const setupInputListeners = (param: SetupInputListenersParam): void => {
  const { handleInput } = param;

  // will probably break with multi touch.
  let touches: Touch[] = [];

  function getEventType(dx: number, dy: number, clientX: number): EventType {
    if (dx === 0 && dy === 0) {
      // tap
      // determine position on screen
      if (clientX > window.innerWidth / 2) {
        return EventType.Rotate;
      } else {
        return EventType.RotateReverse;
      }
    }

    const horizontalSwipe = Math.abs(dx) > Math.abs(dy);
    if (horizontalSwipe) {
      if (dx > 0) {
        return EventType.InputRight;
      } else {
        return EventType.InputLeft;
      }
    } else {
      // TODO test on different devices..
      if (dy > 200) {
        console.log(dy);
        return EventType.QuickDrop;
      } else if (dy > 0) {
        return EventType.InputDown;
      } else {
        return EventType.InputUp;
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
    const R = 82;
    const W = 87;
    const SPACE = 32;
    const ENTER = 13;

    const inputMapping: {
      [index: number]: EventType;
    } = {
      [LEFT]: EventType.InputLeft,
      [RIGHT]: EventType.InputRight,
      [UP]: EventType.InputUp,
      [DOWN]: EventType.InputDown,
      [E]: EventType.Rotate,
      [Q]: EventType.RotateReverse,
      [W]: EventType.QuickDrop,
      [SPACE]: EventType.GravityDrop,
      [ENTER]: EventType.Confirmation,
      [R]: EventType.Restart
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

    const inputType = getEventType(dx, dy, lastTouch.clientX);
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
