main();

function main() {
  const html = document.getElementById('wrapper');
  setupInputListeners(html);
}

// temporary way of testing input
function setLabelText(text) {
  const label = document.getElementById('input');
  label.innerText = text;
}

// input types
const INPUT_LEFT = 'INPUT_LEFT';
const INPUT_RIGHT = 'INPUT_RIGHT';
const INPUT_UP = 'INPUT_UP';
const INPUT_DOWN = 'INPUT_DOWN';
const INPUT_MAIN_ACTION = 'INPUT_MAIN_ACTION';

function registerInput(input) {
  switch (input) {
    case INPUT_LEFT:
      setLabelText('left');
      break;
    case INPUT_RIGHT:
      setLabelText('right');
      break;
    case INPUT_UP:
      setLabelText('up');
      break;
    case INPUT_DOWN:
      setLabelText('down');
      break;
    case INPUT_MAIN_ACTION:
      setLabelText('🎉');
      break;
    default:
      throw new Error(`Unknown input - ${input}`)
      break;
  }
}

function setupInputListeners(element) {
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
    const SPACE = 32;

    if (event.keyCode === LEFT) {
      registerInput(INPUT_LEFT);
    }
    if (event.keyCode === RIGHT) {
      registerInput(INPUT_RIGHT);
    }
    if (event.keyCode === UP) {
      registerInput(INPUT_UP);
    }
    if (event.keyCode === DOWN) {
      registerInput(INPUT_DOWN);
    }
    if (event.keyCode === SPACE) {
      registerInput(INPUT_MAIN_ACTION);
    }
  }

  function handleTouchStart(event) {
    touches.push(event.touches[0]);
  }

  function handleTouchMove(event) {
    touches.push(event.touches[0]);
  }

  function handleTouchEnd(event) {
    const initialTouch = touches[0];
    const lastTouch = touches[touches.length - 1];

    const dx = lastTouch.pageX - initialTouch.pageX;
    const dy = lastTouch.pageY - initialTouch.pageY;

    const inputType = getInputType(dx, dy);
    registerInput(inputType);

    touches = [];
  }

  function getInputType(dx, dy) {
    if (dx === 0 && dy === 0) {
      // tap
      return INPUT_MAIN_ACTION;
    }

    const isHorizontal = Math.abs(dx) > Math.abs(dy);
    if (isHorizontal) {
      if (dx > 0) {
        return INPUT_RIGHT;
      } else {
        return INPUT_LEFT;
      }
    } else {
      if (dy > 0) {
        return INPUT_DOWN;
      } else {
        return INPUT_UP;
      }
    }
  }

  function handleTouchCancel(event) {
    // not really sure when this is triggered. delegate it to touch end handler for now.
    handleTouchEnd(event);
  }
}
