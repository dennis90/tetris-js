const BOARD_COLS = 10;
const BOARD_ROWS = 16;
const EMPTY_CELL = -1;

const CELL_SIZE = 30;
const SPACING = 2;
const BLOCK_WITH_SPACE = CELL_SIZE + SPACING;

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 700;


const PIECES = [
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ]
];


const COLORS = [
  "200, 0, 0",
  "0, 200, 200",
  "0, 200, 0",
  "0, 0, 200",
  "200, 0, 200",
  "200, 200, 0",
  "200, 200, 200"
]
