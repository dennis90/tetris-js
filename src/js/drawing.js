const SPACING = 2;
const BLOCK_SIZE = 30

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 700;

var canvas = document.getElementById('board')
var ctx = canvas.getContext('2d');

function drawPiece(piece, color, initialX=0, initialY=0) {
  ctx.fillStyle = "rgb(" + color + ")";
  for (var row = 0; row < piece.length; row++) {
    var yspace = SPACING * row;
    for (var column = 0; column < piece[row].length; column++) {
      if (piece[row][column] == 1) {
        var xspace = SPACING * column;
        ctx.fillRect(initialX + (column * BLOCK_SIZE) + xspace, initialY + (row * BLOCK_SIZE) + yspace, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

function clearCanvas() {
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
