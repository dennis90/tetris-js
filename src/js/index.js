var lastPiece = -1;
var initialX = 0;
var initialY = 0;

const index = Math.floor(Math.random() * 7);
setInterval(function() {
  clearCanvas()
  drawPiece(PIECES[index], COLORS[index], initialX, initialY);
  initialY += BLOCK_SIZE;
}, 1000);


function onKeyDown(e) {
  var event = window.event ? window.event : e;
  const KEY_RIGHT = 39;
  const KEY_LEFT = 37;

  if (event.keyCode == KEY_RIGHT && initialX < 400) {
    initialX += BLOCK_SIZE;
  } else if (event.keyCode == KEY_LEFT && initialX > 0) {
    initialX -= BLOCK_SIZE;
  }
}

window.addEventListener('keydown', onKeyDown)
