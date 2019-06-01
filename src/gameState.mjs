import { INPUT_TYPES } from './inputHandling.mjs';
import { createGamePiece, GAME_PIECE_TYPES } from './gamePiece.mjs';
import { COLUMNS, ROWS, EMPTY_SPACE_CHAR, GAME_PIECE_CHAR } from './config.mjs';

export const initializeGameState = () => {
  const gamePieces = [];
  const testPiece = createGamePiece({
    topLeftX: 2,
    topLeftY: 1,
    pieceType: GAME_PIECE_TYPES.TEEWEE
  });
  gamePieces.push(testPiece);

  // this will grow and should probably be moved out
  const handleInput = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
      case INPUT_TYPES.INPUT_RIGHT:
      case INPUT_TYPES.INPUT_UP:
      case INPUT_TYPES.INPUT_DOWN:
        gamePieces.forEach(piece => {
          const nextState = piece.getNextState(input);
          let validMove = true;
          const { coordinates } = nextState;
          for (let i = 0; i < coordinates.length; i++) {
            const coordinate = coordinates[i];
            if (
              coordinate.x < 0 ||
              coordinate.x >= COLUMNS ||
              coordinate.y < 0 ||
              coordinate.y >= ROWS
            ) {
              validMove = false;
              break;
            }
          }

          if (validMove) {
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
        gameBoard[y][x] = EMPTY_SPACE_CHAR;
      }
    }

    // place pieces
    gamePieces.forEach(piece => {
      const state = piece.getState();
      state.coordinates.forEach(coordinate => {
        gameBoard[coordinate.y][coordinate.x] = GAME_PIECE_CHAR;
      });
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
