function main() {
  const html = document.getElementById('wrapper');
  setupInputListeners(html);
}

function setLabelText(text) {
  const label = document.getElementById('input');
  label.innerText = text;
}

function setupInputListeners(element) {
  // will probably break with multi touch.
  let touches = [];

  element.addEventListener('touchstart', handleTouchStart, false);
  element.addEventListener('touchend', handleTouchEnd, false);
  element.addEventListener('touchcancel', handleTouchCancel, false);
  element.addEventListener('touchmove', handleTouchMove, false);

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
    setLabelText(inputType);

    touches = [];
  }

  function getInputType(dx, dy) {
    if (dx === 0 && dy === 0) {
      return 'tap';
    }

    const isHorizontal = Math.abs(dx) > Math.abs(dy);
    if (isHorizontal) {
      if (dx > 0) {
        return 'right';
      } else {
        return 'left';
      }
    } else {
      if (dy > 0) {
        return 'down';
      } else {
        return 'up';
      }
    }
  }

  function handleTouchCancel(event) {
    // not really sure when this is triggered. delegate it to touch end handler for now.
    handleTouchEnd(event);
  }
}
