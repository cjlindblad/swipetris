import { INPUT_TYPES } from './inputHandling.mjs';
import { createGamePiece, GAME_PIECE_TYPES } from './gamePiece.mjs';
import { COLUMNS, ROWS, EMPTY_SPACE_CHAR, GAME_PIECE_CHAR } from './config.mjs';

export const initializeGameState = () => {
  const gamePieces = [];
  const testPiece = createGamePiece({
    topLeftX: 2,
    topLeftY: 0,
    pieceType: GAME_PIECE_TYPES.TEEWEE
  });
  gamePieces.push(testPiece);

  const isValidMove = coordinates => {
    let validMove = true;

    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i];
      // check for out of bounds
      if (
        coordinate.x < 0 ||
        coordinate.x >= COLUMNS ||
        coordinate.y < 0 ||
        coordinate.y >= ROWS
      ) {
        validMove = false;
        break;
      }

      // check for collision with non-active pieces
      // TODO optimize and clean this up..
      gamePieces
        .filter(piece => !piece.isActive())
        .forEach(piece => {
          if (!validMove) {
            return;
          }
          piece.getState().coordinates.forEach(c => {
            if (!validMove) {
              return;
            }

            if (c.x === coordinate.x && c.y === coordinate.y) {
              validMove = false;
            }
          });
        });

    }

    return validMove;
  }

  // this will grow and should probably be moved out
  const handleInput = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
      case INPUT_TYPES.INPUT_RIGHT:
      case INPUT_TYPES.INPUT_UP:
      case INPUT_TYPES.INPUT_DOWN:
      case INPUT_TYPES.INPUT_MAIN_ACTION:
        gamePieces.forEach(piece => {
          if (!piece.isActive()) {
            return;
          }

          const nextState = piece.getNextState(input);
          const validMove = isValidMove(nextState.coordinates);
          if (validMove) {
            piece.setState(nextState);
          }
        });
        break;
      case INPUT_TYPES.GRAVITY_DROP:
        gamePieces.forEach(piece => {
          if (!piece.isActive()) {
            return;
          }

          // similar to logic above, but we'll let it be for now
          const nextState = piece.getNextState(input);
          const validMove = isValidMove(nextState.coordinates);
          if (validMove) {
            piece.setState(nextState);
          } else {
            piece.setState({
              active: false
            });
            const newTestPiece = createGamePiece({
              topLeftX: 2,
              topLeftY: 0,
              pieceType: GAME_PIECE_TYPES.TEEWEE
            });
            gamePieces.push(newTestPiece);
          }
        });
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
