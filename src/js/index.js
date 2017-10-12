const SPACING = 2;
const BLOCK_SIZE = 30

var canvas = document.getElementById('board')
var ctx = canvas.getContext('2d');

function drawPiece(piece, color) {
  ctx.fillStyle = "rgb(" + color + ")";
  for (var row = 0; row < piece.length; row++) {
    var yspace = SPACING * row;
    for (var column = 0; column < piece[row].length; column++) {
      if (piece[row][column] == 1) {
        var xspace = SPACING * column;
        ctx.fillRect(column * BLOCK_SIZE + xspace, row * BLOCK_SIZE + yspace, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

var index = Math.floor(Math.random() * 7)
drawPiece(PIECES[index], COLORS[index])
