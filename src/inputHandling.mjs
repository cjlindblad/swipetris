// input types
export const INPUT_TYPES = {
  INPUT_LEFT: 'INPUT_LEFT',
  INPUT_RIGHT: 'INPUT_RIGHT',
  INPUT_UP: 'INPUT_UP',
  INPUT_DOWN: 'INPUT_DOWN',
  ROTATE: 'ROTATE',
  ROTATE_REVERSE: 'ROTATE_REVERSE',
  GRAVITY_DROP: 'GRAVITY_DROP'
};

export const setupInputListeners = (element, handleInput) => {
  // will probably break with multi touch.
  let touches = [];

  // swipe listeners
  element.addEventListener('touchstart', handleTouchStart, false);
  element.addEventListener('touchend', handleTouchEnd, false);
  element.addEventListener('touchcancel', handleTouchCancel, false);
  element.addEventListener('touchmove', handleTouchMove, false);

  // why not key listeners as well?
  element.addEventListener('keydown', handleKeyDown, false);

  function handleKeyDown(event) {
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
      handleInput(INPUT_TYPES.INPUT_LEFT);
    }
    if (event.keyCode === RIGHT) {
      handleInput(INPUT_TYPES.INPUT_RIGHT);
    }
    if (event.keyCode === UP) {
      handleInput(INPUT_TYPES.INPUT_UP);
    }
    if (event.keyCode === DOWN) {
      handleInput(INPUT_TYPES.INPUT_DOWN);
    }
    if (event.keyCode === E) {
      handleInput(INPUT_TYPES.ROTATE);
    }
    if (event.keyCode === Q) {
      handleInput(INPUT_TYPES.ROTATE_REVERSE);
    }
    if (event.keyCode === SPACE) {
      handleInput(INPUT_TYPES.GRAVITY_DROP);
    }
  }

  function handleTouchStart(event) {
    touches.push(event.touches[0]);
  }

  function handleTouchMove(event) {
    touches.push(event.touches[0]);
  }

  function handleTouchEnd() {
    const initialTouch = touches[0];
    const lastTouch = touches[touches.length - 1];

    const dx = lastTouch.pageX - initialTouch.pageX;
    const dy = lastTouch.pageY - initialTouch.pageY;

    const inputType = getInputType(dx, dy, lastTouch.clientX);
    handleInput(inputType);

    touches = [];
  }

  function getInputType(dx, dy, clientX) {
    if (dx === 0 && dy === 0) {
      // tap
      // determine position on screen
      if (clientX > window.innerWidth / 2) {
        return INPUT_TYPES.ROTATE;
      } else {
        return INPUT_TYPES.ROTATE_REVERSE;
      }
    }

    const horizontalSwipe = Math.abs(dx) > Math.abs(dy);
    if (horizontalSwipe) {
      if (dx > 0) {
        return INPUT_TYPES.INPUT_RIGHT;
      } else {
        return INPUT_TYPES.INPUT_LEFT;
      }
    } else {
      if (dy > 0) {
        return INPUT_TYPES.INPUT_DOWN;
      } else {
        return INPUT_TYPES.INPUT_UP;
      }
    }
  }

  function handleTouchCancel(event) {
    // not really sure when this is triggered. delegate it to touch end handler for now.
    handleTouchEnd(event);
  }
};
