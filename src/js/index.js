var lastPiece = -1;
var initialX = 0;
var initialY = 0;

const index = Math.floor(Math.random() * 7);
setInterval(function() {
  clearCanvas()
  drawGrid()
  drawPiece(PIECES[index], COLORS[index], initialX, initialY);
  initialY += 1;
}, 1000);


function onKeyDown(e) {
  let event = window.event ? window.event : e;
  const KEY_RIGHT = 39;
  const KEY_LEFT = 37;

  const movementAllowed = canMoveHorizontal(PIECES[index], initialX, initialY)

  console.log('MOVE RIGHT', event.keyCode, KEY_RIGHT, movementAllowed)
  if (event.keyCode == KEY_RIGHT && movementAllowed.right) {
    initialX++;
  } else if (event.keyCode == KEY_LEFT && movementAllowed.left) {
    initialX--;
  }
}

window.addEventListener('keydown', onKeyDown)
