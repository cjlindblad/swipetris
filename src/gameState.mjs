import { INPUT_TYPES } from './inputHandling.mjs';
import { createGamePiece, GAME_PIECE_TYPES } from './gamePiece.mjs';
import { COLUMNS, ROWS, EMPTY_SPACE_CHAR, GAME_PIECE_CHAR } from './config.mjs';

export const initializeGameState = () => {
  const gamePieces = [];
  const testPiece = createGamePiece({
    centerX: 2,
    centerY: 1,
    pieceType: GAME_PIECE_TYPES.ORANGE_RICKY
  });
  gamePieces.push(testPiece);

  // setup game board
  const gameBoard = [];
  for (let y = 0; y < ROWS; y++) {
    gameBoard[y] = [];
    for (let x = 0; x < COLUMNS; x++) {
      gameBoard[y][x] = EMPTY_SPACE_CHAR;
    }
  }

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

      // check for collision with rest of board
      if (gameBoard[coordinate.y][coordinate.x] !== EMPTY_SPACE_CHAR) {
        validMove = false;
      }
    }

    return validMove;
  };

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
            // this is where a piece lands
            // lots of stuff happening. maybe break it out to separate functions for clarity.

            // transfer active piece to game board
            if (gamePieces.length > 1) {
              throw new Error('Check me');
            }
            const activePiece = gamePieces[0];
            const activePieceCoordinates = activePiece.getState().coordinates;
            activePieceCoordinates.forEach(coordinate => {
              gameBoard[coordinate.y][coordinate.x] = activePiece.getChar();
            });
            gamePieces.pop();

            // deactivate current piece
            piece.setState({
              active: false
            });

            // check for solid lines
            const solidRows = [];
            for (let y = ROWS - 1; y >= 0; y--) {
              let solid = true;
              for (let x = 0; x < COLUMNS; x++) {
                if (gameBoard[y][x] === EMPTY_SPACE_CHAR) {
                  solid = false;
                  break;
                }
              }
              if (solid) {
                solidRows.push(y);
              }
            }

            // clear solid lines
            solidRows.forEach(y => {
              for (let x = 0; x < COLUMNS; x++) {
                gameBoard[y][x] = EMPTY_SPACE_CHAR;
              }
            });

            // move everything down after clearace
            if (solidRows.length > 0) {
              // start at first solid line row minus one
              for (let y = solidRows[0] - 1; y >= 0; y--) {
                for (let x = 0; x < COLUMNS; x++) {
                  if (gameBoard[y][x] !== EMPTY_SPACE_CHAR) {
                    const pieceChar = gameBoard[y][x];

                    let nextY = y;
                    let freeSpaceDownwards = true;
                    while (freeSpaceDownwards && nextY < ROWS - 1) {
                      if (gameBoard[nextY + 1][x] === EMPTY_SPACE_CHAR) {
                        nextY++;
                      } else {
                        freeSpaceDownwards = false;
                      }
                    }

                    // only swap if piece was moved
                    if (y !== nextY) {
                      gameBoard[y][x] = EMPTY_SPACE_CHAR;
                      gameBoard[nextY][x] = pieceChar;
                    }
                  }
                }
              }
            }

            // add new piece to board
            const newTestPiece = createGamePiece({
              centerX: 2,
              centerY: 1,
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
    const gameBoardBuffer = [];
    for (let y = 0; y < ROWS; y++) {
      gameBoardBuffer[y] = [];
      for (let x = 0; x < COLUMNS; x++) {
        gameBoardBuffer[y][x] = gameBoard[y][x];
      }
    }

    // place pieces
    // TODO should only be one
    gamePieces.forEach(piece => {
      const state = piece.getState();
      state.coordinates.forEach(coordinate => {
        gameBoardBuffer[coordinate.y][coordinate.x] = GAME_PIECE_CHAR;
      });
    });

    // generate string representation
    let renderString = '';
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLUMNS; x++) {
        renderString += gameBoardBuffer[y][x];
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
