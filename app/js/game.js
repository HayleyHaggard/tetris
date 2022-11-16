export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
  ];

  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],

    //another realisation

    // get blocks() {
    //   return this.rotations[this.rotationIndex];
    // },
    // rotationIndex: 0,
    // rotations: [
    //   [
    //     [0, 1, 0],
    //     [1, 1, 1],
    //     [0, 0, 0]
    //   ],
    //   [
    //     [0, 1, 0],
    //     [0, 1, 1],
    //     [0, 1, 0]
    //   ],
    //   [
    //     [0, 0, 0],
    //     [1, 1, 1],
    //     [0, 1, 0]
    //   ],
    //   [
    //     [0, 1, 0],
    //     [1, 1, 0],
    //     [0, 1, 0]
    //   ]
    // ]
  };

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
    }
  }

  //move our piece in field
  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }

  //if our piece near the bound - we can't rotate it
  rotatePiece() {
    this.rotateBlocks();

    if (this.hasCollision()) {
      this.rotateBlocks(false);
    }

    //another realisation without rotateBlocks()
    // this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0;
    // if (this.hasCollision()) {
    //   this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3;
    // }
    // return this.activePiece.blocks;
  }

  //rotate our piece in both directions
  rotateBlocks(clockwise = true) {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    const x = Math.floor(length / 2);
    const y = Math.floor(length - 1);

    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        const temp = blocks[i][j];

        if (clockwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  }

  //check if our piece isn't out of bounds and if it didn't collide with another piece
  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
            this.playfield[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }

    return false;
  }
}