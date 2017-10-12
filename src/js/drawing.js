const SPACING = 2;
const BLOCK_SIZE = 30

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 700;

var canvas = document.getElementById('board')
var ctx = canvas.getContext('2d');

function drawPiece(piece, color, gridCol=0, gridRow=0) {
  const currentX = (BLOCK_SIZE + SPACING) * gridCol;
  const currentY = (BLOCK_SIZE + SPACING) * gridRow;

  ctx.fillStyle = "rgb(" + color + ")";
  for (var row = 0; row < piece.length; row++) {
    var yspace = SPACING * row;
    for (var column = 0; column < piece[row].length; column++) {
      if (piece[row][column] == 1) {
        var xspace = SPACING * column;
        ctx.fillRect(currentX + (column * BLOCK_SIZE) + xspace, currentY + (row * BLOCK_SIZE) + yspace, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

function drawGrid() {
  let pxY = 0;
  let pxX = 0;

  for (let row = 0; row < BOARD.length; row++) {
    pxY = (SPACING * row) + (row * BLOCK_SIZE);
    for (let col = 0; col < BOARD[row].length; col++) {
      pxX = (SPACING * col) + (col * BLOCK_SIZE);
      if (BOARD[row][col] >= 0) {
        ctx.fillStyle = "rgb(" + COLORS[BOARD[row][col]] + ")";
      } else {
        ctx.fillStyle = "rgb(255, 255, 255)";
      }
      ctx.fillRect(pxX, pxY, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
}

function clearCanvas() {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
