var BOARD = null;

var pieceLoop = null;
var currentSpeed = 1.0;

var currentPieceY = 0;
var currentPieceX = 0;
var currentPieceIdx = -1;
var nextPieceIdx = -1;

var currentPiece = null;

const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d');

function startGame() {
  initializeBoard();
  currentPieceIdx = getNextPiece();
  nextPieceIdx = getNextPiece();
  currentPiece = PIECES[currentPieceIdx];
  currentPieceX = Math.floor((BOARD_COLS / 2) - (currentPiece[0].length / 2));
  currentPieceY = currentPiece.length * (-1);
  pieceLoop = setInterval(gameLoop, 1000 * currentSpeed);
}

function stopGame() {
  clearInterval(pieceLoop);
  initializeBoard();
  clearCanvas();
  drawBoard();
}

function gameLoop() {
  clearCanvas();
  drawBoard();
  drawPiece(currentPiece, COLORS[currentPieceIdx], currentPieceY, currentPieceX);

  if (hasCollided(currentPiece, currentPieceY, currentPieceX)) {
    clearInterval(pieceLoop);

    pushPieceToBoard(currentPieceX, currentPieceY);

    currentPieceIdx = nextPieceIdx;
    nextPieceIdx = getNextPiece();

    currentPiece = PIECES[currentPieceIdx];

    currentPieceX = Math.floor((BOARD_COLS / 2) - (currentPiece[0].length / 2));
    currentPieceY = currentPiece.length * (-1);

    pieceLoop = setInterval(gameLoop, 1000 * currentSpeed);
  } else {
    currentPieceY++;
  }
}

function drawPiece(piece, color, posY, posX) {
  const currentX = BLOCK_WITH_SPACE * posX;
  const currentY = BLOCK_WITH_SPACE * posY;

  let vStart = 0;
  let hStart = 0;

  ctx.fillStyle = "rgb(" + color + ")";

  for (let row = 0; row < piece.length; row++) {
    vStart = BLOCK_WITH_SPACE * row;
    for (let col = 0; col < piece[row].length; col++) {
      if (piece[row][col] == 1) {
        let hStart = BLOCK_WITH_SPACE * col;
        ctx.fillRect(currentX + hStart, currentY + vStart, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function clearCanvas() {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function initializeBoard() {
  BOARD = [];
  for (let row = 0; row < BOARD_ROWS; row++) {
    let currentRow = [];
    for (let col = 0; col < BOARD_COLS; col++) {
      currentRow.push(EMPTY_CELL);
    }
    BOARD.push(currentRow)
  }
}

function drawBoard() {
  let pxY = 0;
  let pxX = 0;

  for (let row = 0; row < BOARD.length; row++) {
    pxY = BLOCK_WITH_SPACE * row;

    for (let col = 0; col < BOARD[row].length; col++) {
      pxX = BLOCK_WITH_SPACE * col;

      if (BOARD[row][col] >= 0) {
        ctx.fillStyle = "rgb(" + COLORS[BOARD[row][col]] + ")";
      } else {
        ctx.fillStyle = "rgb(255, 255, 255)";
      }
      ctx.fillRect(pxX, pxY, CELL_SIZE, CELL_SIZE);
    }
  }
}

function hasCollided(currentPiece, posY, posX) {
  let collided = false;

  const lastRow = currentPiece[currentPiece.length - 1];

  if (posY + currentPiece.length == BOARD_ROWS) {
    collided = true;
  } else {
    for (let col = 0; col < lastRow.length; col++) {
      if (lastRow[col] == 1) {
        if (BOARD[posY + currentPiece.length][posX + col] >= 0) {
          collided = true
        }
      }
    }
  }

  return collided
}

function pushPieceToBoard(posX, posY) {
  for (var row = 0; row < currentPiece.length; row++) {
    for (var col = 0; col < currentPiece[row].length; col++) {
      if (currentPiece[row][col] == 1) {
        BOARD[row + posY][col + posX] = currentPieceIdx;
      }
    }
  }
}

function getNextPiece() {
  let nextIndex
  do {
    nextIndex = Math.floor(Math.random() * PIECES.length);
  } while (nextIndex == currentPieceIdx)

  return nextIndex;
}


function onKeyDown(e) {
  let event = window.event ? window.event : e;
  const KEY_RIGHT = 39;
  const KEY_LEFT = 37;

  const movementAllowed = canMoveHorizontal(currentPiece, currentPieceX, currentPieceY)

  if (event.keyCode == KEY_RIGHT && movementAllowed.right) {
    currentPieceX++;
  } else if (event.keyCode == KEY_LEFT && movementAllowed.left) {
    currentPieceX--;
  }
}

window.addEventListener('keydown', onKeyDown)

function canMoveHorizontal(currentPiece, currentPieceX, currentPieceY) {
  let marginLeft = 0;
  let marginRight = 0;
  let colIgnored;

  for (let col = 0; col < currentPiece[0].length; col++) {
    const columnHasBlocks = currentPiece.some(function(row) {
      return row[col] == 1;
    })
    if (!columnHasBlocks) {
      ++marginLeft;
    } else {
      break;
    }
  }

  for (let col = currentPiece[0].length - 1; col >= 0; col--) {
    const columnHasBlocks = currentPiece.some(function(row) {
      return row[col] == 1;
    })

    if (!columnHasBlocks) {
      ++marginRight;
    } else {
      break;
    }
  }

  const borders = {
    left: (currentPieceX + marginLeft - 1) >= 0,
    right: (currentPieceX + currentPiece[0].length - marginRight + 1) <= BOARD_COLS,
  }
}
