import { INPUT_TYPES } from './inputHandling.mjs';
import { createGamePiece } from './gamePiece.mjs';

export const initializeGameState = () => {
  const COLUMNS = 8;
  const ROWS = 5;

  const gamePieces = [];
  const testPiece = createGamePiece({ x: 2, y: 2 });
  gamePieces.push(testPiece);

  const handleInput = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
      case INPUT_TYPES.INPUT_RIGHT:
      case INPUT_TYPES.INPUT_UP:
      case INPUT_TYPES.INPUT_DOWN:
        gamePieces.forEach(piece => {
          const nextState = piece.getNextState(input);
          if (
            nextState.x >= 0 &&
            nextState.x < COLUMNS &&
            nextState.y >= 0 &&
            nextState.y < ROWS
          ) {
            piece.setState(nextState);
          }
        });
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
      const state = piece.getState();
      gameBoard[state.y][state.x] = '👾';
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
