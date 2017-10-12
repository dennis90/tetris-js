const BOARD_COLS = 10;
const BOARD_ROWS = 16;
const EMPTY_CELL = -1;

function buildBoard() {
  let board = [];
  for (let row = 0; row < BOARD_ROWS; row++) {
    let currentRow = [];
    for (let col = 0; col < BOARD_COLS; col++) {
      currentRow.push(EMPTY_CELL);
    }
    board.push(currentRow)
  }
  return board;
}

var BOARD = buildBoard();

function addPieceToBoard(pieceIndex, posX, posY) {
  const piece = PIECES[pieceIndex];

  for (var col = 0; col < piece.length; col++) {
    for (var row = 0; row < piece[col].length; row++) {
      if (piece[col][row] == 1) {
        BOARD[col + posX][row + posY] = pieceIndex;
      }
    }
  }
}

function hasCollided(pieceIndex, posX, posY) {
  const piece = PIECES[pieceIndex];
  let collided = false;

  const lastRow = piece[piece.length - 1];

  if (posY + piece.length == BOARD_ROWS) {
    collided = true;
  }

  for (let col = 0; col < lastRow.length; col++) {
    if (lastRow[col] == 1 && BOARD[posX + 1][posY + col] > 0) {
        collided = true
      }
    }

  if (collided) {
    addPieceToBoard(pieceIndex, posX, posY)
  }
  return collided
}

function canMoveHorizontal(piece, posX, posY) {
  let marginLeft = 0;
  for (let col = 0; col < piece[0].length; col++) {
    let colIgnored = true;
    for (let row = 0; row < piece.length; row++) {
      if (piece[row][col] == 1) {
        colIgnored = false;
      }
    }
    if (colIgnored) {
      ++marginLeft;
    }
  }

  let marginRight = 0;
  for (let col = piece[0].length - 1; col >= 0; col--) {
    let colIgnored = true;
    for (let row = 0; row < piece.length; row++) {
      if (piece[row][col] == 1) {
        colIgnored = false;
      }
    }
    if (colIgnored) {
      ++marginRight;
    }
  }

  console.log(piece, posX, posY, marginLeft, marginRight);

  return {
    left: (posX + marginLeft - 1) > 0,
    right: (posX + piece[0].length - marginRight + 1) <= BOARD_COLS,
  }
}
