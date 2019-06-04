import { INPUT_TYPES } from './inputHandling.mjs';
import { createGamePiece, GAME_PIECE_TYPES } from './gamePiece.mjs';
import { COLUMNS, ROWS, EMPTY_SPACE_CHAR, GAME_PIECE_CHAR } from './config.mjs';

export const initializeGameState = () => {
  const gamePieces = [];
  const testPiece = createGamePiece({
    topLeftX: 2,
    topLeftY: 0,
    pieceType: GAME_PIECE_TYPES.TEEWEE,
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

            // deactivate current piece
            piece.setState({
              active: false,
            });

            // check for solid lines
            const solidLineCoordinates = [];
            for (let y = 0; y < ROWS; y++) {
              let solidLine = true;

              for (let x = 0; x < COLUMNS; x++) {
                // really, really bad.
                // optimize this.
                let coordinateFound = false;

                gamePieces.forEach(piece => {
                  piece.getState().coordinates.forEach(coordinate => {
                    if (coordinate.y === y && coordinate.x === x) {
                      coordinateFound = true;
                    }
                  });
                });

                if (!coordinateFound) {
                  solidLine = false;
                }
              }

              if (solidLine) {
                // TODO this becomes kind of cumbersome.
                // we have to find all relevant pieces and modify their coordinates.
                for (let x = 0; x < COLUMNS; x++) {
                  if (!solidLineCoordinates[y]) {
                    solidLineCoordinates[y] = [];
                  }
                  solidLineCoordinates[y][x] = true;
                }
              }
            }
            if (solidLineCoordinates.length > 0) {
              // clear solid lines
              gamePieces.forEach(gamePiece => {
                const nextCoordinates = gamePiece
                  .getState()
                  .coordinates.filter(
                    coordinate =>
                      !solidLineCoordinates[coordinate.y] ||
                      !solidLineCoordinates[coordinate.y][coordinate.x]
                  );
                gamePiece.setState({
                  coordinates: nextCoordinates,
                });
              });

              // TODO move everything above solid line down.
              // might be a bit tricky.
            }

            // add new piece to board
            const newTestPiece = createGamePiece({
              topLeftX: 2,
              topLeftY: 0,
              pieceType: GAME_PIECE_TYPES.TEEWEE,
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
    handleInput,
  };
};
