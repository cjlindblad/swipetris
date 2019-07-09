import { INPUT_TYPES } from './input/constants';
import {
  createGamePiece,
  getNextPieceType,
  GAME_PIECE_TYPE
} from './gamePiece/index';
import { getMinMaxCoordinates, transpose } from './gamePiece/utils';
import { COLUMNS, ROWS, BASE_GRAVITY_DELAY } from './config';
import DependencyContainer from './dependencyContainer';

export const initializeGameState = render => {
  let activeGravityDelay = BASE_GRAVITY_DELAY;

  // TODO maybe inject these?
  const dependencyContainer = new DependencyContainer();
  const gameCharSelector = dependencyContainer.resolve('gameCharSelector');
  const EMPTY_SPACE_CHAR = gameCharSelector(GAME_PIECE_TYPE.EMPTY_SPACE);

  // TODO need to handle initial coordinates in a better way
  const initialPiece = createGamePiece({
    centerX: 2,
    centerY: 1,
    pieceType: getNextPieceType()
  });

  const next = createGamePiece({
    centerX: 2,
    centerY: 1,
    pieceType: getNextPieceType()
  });

  let activePiece = initialPiece;
  let nextPiece = next;

  let clearedLines = 0;

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
      case INPUT_TYPES.INPUT_UP:
        break;
      case INPUT_TYPES.INPUT_LEFT:
      case INPUT_TYPES.INPUT_RIGHT:
      case INPUT_TYPES.ROTATE:
      case INPUT_TYPES.ROTATE_REVERSE: {
        const nextState = activePiece.getNextState(input);
        const validMove = isValidMove(nextState.coordinates);

        if (validMove) {
          activePiece.setState(nextState);
          break;
        }

        // try to wall kick if possible
        if (
          input === INPUT_TYPES.ROTATE ||
          input === INPUT_TYPES.ROTATE_REVERSE
        ) {
          const wallKickOffsets = [1, 2, -1, -2];
          for (let i = 0; i < wallKickOffsets.length; i++) {
            const offset = wallKickOffsets[i];
            const transposition = transpose(
              nextState.coordinates,
              nextState.origo,
              offset,
              0
            );
            if (isValidMove(transposition.coordinates)) {
              activePiece.setState(transposition);
              break;
            }
          }
        }

        break;
      }
      case INPUT_TYPES.INPUT_DOWN:
      case INPUT_TYPES.GRAVITY_DROP: {
        setGravityInterval(activeGravityDelay);

        const nextState = activePiece.getNextState(input);
        const validMove = isValidMove(nextState.coordinates);
        if (validMove) {
          activePiece.setState({ ...nextState, moves: nextState.moves + 1 });
        } else {
          if (nextState.moves === 0) {
            // TODO
            // alert('GAME OVER!!11!1!!!');
          }
          // this is where a piece lands
          // lots of stuff happening. maybe break it out to separate functions for clarity.

          // transfer active piece to game board
          const activePieceCoordinates = activePiece.getState().coordinates;
          activePieceCoordinates.forEach(coordinate => {
            gameBoard[coordinate.y][coordinate.x] = activePiece.getChar();
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

                  // only move max the number of lines cleared
                  const CLEARED_LINES = solidRows.filter(e => e > y).length;

                  let nextY = y;
                  let freeSpaceDownwards = true;
                  while (freeSpaceDownwards && nextY < y + CLEARED_LINES) {
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

          // register cleared lines to score
          clearedLines += solidRows.length;

          // add new active piece
          const newPiece = createGamePiece({
            centerX: 2,
            centerY: 1,
            pieceType: getNextPieceType()
          });
          activePiece = nextPiece;
          nextPiece = newPiece;
        }
        break;
      }
      default:
        throw new Error(`Unknown input - ${input}`);
    }

    render(getRepresentation());
  };

  const getRepresentation = () => {
    // this might be a weird way to do it, but it's a start!

    // create buffer of game state board
    const gameBoardBuffer = [];
    for (let y = 0; y < ROWS; y++) {
      gameBoardBuffer[y] = [];
      for (let x = 0; x < COLUMNS; x++) {
        gameBoardBuffer[y][x] = gameBoard[y][x];
      }
    }

    // place active piece
    const state = activePiece.getState();
    state.coordinates.forEach(coordinate => {
      gameBoardBuffer[coordinate.y][coordinate.x] = activePiece.getChar();
    });

    // generate string representation
    let renderString = '';
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLUMNS; x++) {
        renderString += gameBoardBuffer[y][x];
      }
      renderString += '\n';
    }

    // not sure if we should just use a big string, or split the "UI" up

    const nextPiecePreview = nextPiece.getPreview();
    let pieceCoordinates = [];
    nextPiecePreview.forEach(coordinate => {
      if (!pieceCoordinates[coordinate.y]) {
        pieceCoordinates[coordinate.y] = [];
      }
      pieceCoordinates[coordinate.y][coordinate.x] = nextPiece.getChar();
    });

    let previewString = '';
    const [min, max] = getMinMaxCoordinates(nextPiecePreview);
    for (let y = min.y; y <= max.y; y++) {
      for (let x = min.x; x <= max.x; x++) {
        previewString += pieceCoordinates[y][x] || EMPTY_SPACE_CHAR;
      }
      if (y < max.y) {
        previewString += '\n';
      }
    }

    return {
      renderString,
      nextPiece: previewString,
      score: clearedLines
    };
  };

  let gravityInterval = null;
  const setGravityInterval = interval => {
    if (gravityInterval !== null) {
      clearInterval(gravityInterval);
    }

    const triggerGravityDrop = () => {
      handleInput(INPUT_TYPES.GRAVITY_DROP);
      render(getRepresentation());
    };

    gravityInterval = setInterval(triggerGravityDrop, interval);
  };

  // initial gravity
  setGravityInterval(BASE_GRAVITY_DELAY);

  // initial render
  render(getRepresentation());

  return {
    getRepresentation,
    handleInput
  };
};
