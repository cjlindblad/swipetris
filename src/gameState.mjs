import { INPUT_TYPES } from './inputHandling.mjs';

/*

piece rotation would work like this

.... ..x. .... .x..
xxxx ..x. .... .x..
.... ..x. xxxx .x..
.... ..x. .... .x..

xxx ..x ... x..
.x. .xx .x. xx.
... ..x xxx x..

xx. ..x ... .x.
.xx .xx xx. xx.
... .x. .xx x..

.xx .x. ... x.. 
xx. .xx .xx xx.
... ..x xx. .x.

xx xx xx xx
xx xx xx xx

*/

const createGamePiece = (x, y) => {
  let _x = x;
  let _y = y;

  const inputLeft = () => {
    _x = _x - 1;
  };
  const inputRight = () => {
    _x = _x + 1;
  };
  const inputUp = () => {
    _y = _y - 1;
  };
  const inputDown = () => {
    _y = _y + 1;
  };

  const getCoordinate = () => ({
    x: _x,
    y: _y
  });

  return {
    inputLeft,
    inputRight,
    inputUp,
    inputDown,
    getCoordinate
  };
};

export const initializeGameState = () => {
  const COLUMNS = 8;
  const ROWS = 5;

  const gamePieces = [];
  const testPiece = createGamePiece(2, 2);
  gamePieces.push(testPiece);

  const handleInput = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
        gamePieces.forEach(piece => piece.inputLeft());
        break;
      case INPUT_TYPES.INPUT_RIGHT:
        gamePieces.forEach(piece => piece.inputRight());
        break;
      case INPUT_TYPES.INPUT_UP:
        gamePieces.forEach(piece => piece.inputUp());
        break;
      case INPUT_TYPES.INPUT_DOWN:
        gamePieces.forEach(piece => piece.inputDown());
        break;
      case INPUT_TYPES.INPUT_MAIN_ACTION:
        break;
      default:
        throw new Error(`Unknown input - ${input}`);
    }
  };

  const getRepresentation = () => {
    // this might be a weird way to do it, but it's a start!

    // setup empty board
    const gameBoard = [];
    for (let y = 0; y < ROWS; y++) {
      gameBoard[y] = [];
      for (let x = 0; x < COLUMNS; x++) {
        gameBoard[y][x] = '〰️';
      }
    }

    // place pieces
    gamePieces.forEach(piece => {
      const coordinate = piece.getCoordinate();
      gameBoard[coordinate.y][coordinate.x] = '👾';
    });

    // generate string representation
    let renderString = '';
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLUMNS; x++) {
        renderString += gameBoard[y][x];
      }
      renderString += '\n';
    }

    return renderString;
  };

  return {
    getRepresentation,
    handleInput
  };
};
