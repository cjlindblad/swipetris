function main() {
  const html = document.getElementById('wrapper');
  setupInputListeners(html);
}

function setupInputListeners(element) {
  // this will probably break during multi touch
  let hasActiveEvent = false;

  // might want to handle a couple of these
  let touches = [];

  element.addEventListener('touchstart', handleTouchStart, false);
  element.addEventListener('touchend', handleTouchEnd, false);
  element.addEventListener('touchcancel', handleTouchCancel, false);
  element.addEventListener('touchmove', handleTouchMove, false);

  function handleTouchStart(event) {
    touches.push(event.touches[0]);
  }

  function handleTouchMove(event) {
    // TODO need to wait for a couple of events
    if (!hasActiveEvent) {
      hasActiveEvent = true;

      const initialTouch = touches[0];
      const currentTouch = event.touches[0];

      const dx = currentTouch.pageX - initialTouch.pageX;
      const dy = currentTouch.pageY - initialTouch.pageY;

      if (Math.abs(dx) > Math.abs(dy)) {
        alert('horizontal ' + dx + ' ' + dy);
      } else {
        alert('vertical ' + dx + ' ' + dy);
      }
    }
  }

  function handleTouchEnd(event) {
    hasActiveEvent = false;
    touches = [];
  }

  function handleTouchCancel(event) {
    hasActiveEvent = false;
  }
}
