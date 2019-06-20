import { INPUT_TYPES } from '../input/constants.mjs';
import { isLongestSideEven } from './utils.mjs';

export const GAME_PIECE_TYPES = {
  T: 'T',
  L: 'L',
  L_INVERTED: 'L_INVERTED',
  S: 'S',
  S_INVERTED: 'S_INVERTED',
  I: 'I',
  BLOCK: 'BLOCK'
};

export const getNextPieceType = () => {
  const pieceTypes = Object.keys(GAME_PIECE_TYPES);
  const nextTypeIndex = Math.floor(Math.random() * pieceTypes.length);
  return GAME_PIECE_TYPES[pieceTypes[nextTypeIndex]];
};

// Borrowing some React wording here.
//
// I'm thinking that a given game piece
// should return it's next state on
// any given input, and let external
// logic decide if it's a valid move.
//
// So state updates will happen separately
// from input handling.
export const createGamePiece = initialState => {
  // this will probably be generalized
  const { centerX, centerY, pieceType } = initialState;

  let coordinates = getInitialCoordinates({
    pieceType,
    centerX,
    centerY
  });

  let origo = {
    x: centerX,
    y: centerY
  };

  // initial values
  let char = getPieceChar(pieceType);

  const getState = () => {
    const state = {
      coordinates,
      origo
    };
    return state;
  };

  const getNextState = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x - 1,
            y: coordinate.y
          })),
          origo: {
            x: origo.x - 1,
            y: origo.y
          }
        };
      case INPUT_TYPES.INPUT_RIGHT:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x + 1,
            y: coordinate.y
          })),
          origo: {
            x: origo.x + 1,
            y: origo.y
          }
        };
      case INPUT_TYPES.INPUT_UP:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x,
            y: coordinate.y - 1
          })),
          origo: {
            x: origo.x,
            y: origo.y - 1
          }
        };
      case INPUT_TYPES.INPUT_DOWN:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x,
            y: coordinate.y + 1
          })),
          origo: {
            x: origo.x,
            y: origo.y + 1
          }
        };
      case INPUT_TYPES.ROTATE: {
        const nextRotation = getNextRotation({
          coordinates,
          origo,
          reverse: false
        });
        return {
          coordinates: nextRotation.coordinates,
          origo: nextRotation.origo
        };
      }
      case INPUT_TYPES.ROTATE_REVERSE: {
        const nextRotation = getNextRotation({
          coordinates,
          origo,
          reverse: true
        });
        return {
          coordinates: nextRotation.coordinates,
          origo: nextRotation.origo
        };
      }
      case INPUT_TYPES.GRAVITY_DROP:
        // same as input down, but I think we're gonna rebuild this
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x,
            y: coordinate.y + 1
          })),
          origo: {
            x: origo.x,
            y: origo.y + 1
          }
        };
      default:
        throw new Error(`Unknown input - ${input}`);
    }
  };

  const getChar = () => char;

  const setState = nextState => {
    // TODO generalize and clean up this..
    if (nextState.coordinates !== null && nextState.coordinates !== undefined) {
      coordinates = nextState.coordinates;
    }
    if (nextState.origo !== null && nextState.origo !== undefined) {
      origo = nextState.origo;
    }
  };

  // public API
  return {
    getNextState,
    setState,
    getState,
    getChar
  };
};

const getPieceChar = pieceType => {
  switch (pieceType) {
    case GAME_PIECE_TYPES.L:
      return '😁';
    case GAME_PIECE_TYPES.L_INVERTED:
      return '😫';
    case GAME_PIECE_TYPES.S:
      return '😜';
    case GAME_PIECE_TYPES.S_INVERTED:
      return '🤗';
    case GAME_PIECE_TYPES.T:
      return '😮';
    case GAME_PIECE_TYPES.I:
      return '😎';
    case GAME_PIECE_TYPES.BLOCK:
      return '😅';
    default:
      throw new Error(`Unknown piece type - ${pieceType}`);
  }
};

const getInitialCoordinates = ({ pieceType, centerX, centerY }) => {
  switch (pieceType) {
    case GAME_PIECE_TYPES.T:
      //  x
      // xxx
      return [
        {
          x: centerX,
          y: centerY - 1
        },
        {
          x: centerX - 1,
          y: centerY
        },
        {
          x: centerX,
          y: centerY
        },
        {
          x: centerX + 1,
          y: centerY
        }
      ];
    case GAME_PIECE_TYPES.L:
      //   x
      // xxx
      return [
        {
          x: centerX + 1,
          y: centerY - 1
        },
        {
          x: centerX - 1,
          y: centerY
        },
        {
          x: centerX,
          y: centerY
        },
        {
          x: centerX + 1,
          y: centerY
        }
      ];
    case GAME_PIECE_TYPES.L_INVERTED:
      // x
      // xxx
      return [
        {
          x: centerX - 1,
          y: centerY - 1
        },
        {
          x: centerX - 1,
          y: centerY
        },
        {
          x: centerX,
          y: centerY
        },
        {
          x: centerX + 1,
          y: centerY
        }
      ];
    case GAME_PIECE_TYPES.S:
      //  xx
      // xx
      return [
        {
          x: centerX,
          y: centerY - 1
        },
        {
          x: centerX + 1,
          y: centerY - 1
        },
        {
          x: centerX - 1,
          y: centerY
        },
        {
          x: centerX,
          y: centerY
        }
      ];
    case GAME_PIECE_TYPES.S_INVERTED:
      // xx
      //  xx
      return [
        {
          x: centerX - 1,
          y: centerY - 1
        },
        {
          x: centerX,
          y: centerY - 1
        },
        {
          x: centerX,
          y: centerY
        },
        {
          x: centerX + 1,
          y: centerY
        }
      ];
    case GAME_PIECE_TYPES.I:
      return [
        {
          x: centerX - 1,
          y: centerY
        },
        {
          x: centerX,
          y: centerY
        },
        {
          x: centerX + 1,
          y: centerY
        },
        {
          x: centerX + 2,
          y: centerY
        }
      ];
    case GAME_PIECE_TYPES.BLOCK:
      return [
        {
          x: centerX,
          y: centerY
        },
        {
          x: centerX + 1,
          y: centerY
        },
        {
          x: centerX,
          y: centerY + 1
        },
        {
          x: centerX + 1,
          y: centerY + 1
        }
      ];
    default:
      throw new Error(`Unknown piece type - ${pieceType}`);
  }
};

const getNextRotation = ({ coordinates, origo, reverse }) => {
  // General rotation algorithm:
  // Keep track of origo and use relative positioning of all the pieces.
  // For each rotation: x2 = y1 * -1, y2 = x1

  let nextOrigo = {
    x: origo.x,
    y: origo.y
  };

  const needsTemporaryOrigoCross = isLongestSideEven(coordinates);

  let nextCoordinates = coordinates.map(coordinate => {
    const inTopLeftQuadrant =
      coordinate.x <= nextOrigo.x && coordinate.y <= nextOrigo.y;
    if (!needsTemporaryOrigoCross || inTopLeftQuadrant) {
      return {
        x: coordinate.x,
        y: coordinate.y
      };
    }

    return {
      x: coordinate.x > nextOrigo.x ? coordinate.x + 1 : coordinate.x,
      y: coordinate.y > nextOrigo.y ? coordinate.y + 1 : coordinate.y
    };
  });

  if (needsTemporaryOrigoCross) {
    nextOrigo = {
      x: nextOrigo.x + 1,
      y: nextOrigo.y + 1
    };
  }

  nextCoordinates = nextCoordinates.map(coordinate => {
    const dx1 = coordinate.x - nextOrigo.x;
    const dy1 = coordinate.y - nextOrigo.y;

    let dx2;
    let dy2;

    if (!reverse) {
      dx2 = dy1 * -1;
      dy2 = dx1;
    } else {
      dx2 = dy1;
      dy2 = dx1 * -1;
    }

    const x2 = nextOrigo.x + dx2;
    const y2 = nextOrigo.y + dy2;

    return {
      x: x2,
      y: y2
    };
  });

  // delete origo cross
  if (needsTemporaryOrigoCross) {
    nextOrigo = {
      x: nextOrigo.x - 1,
      y: nextOrigo.y - 1
    };

    nextCoordinates = nextCoordinates.map(coordinate => {
      if (coordinate.x <= nextOrigo.x && coordinate.y <= nextOrigo.y) {
        return coordinate;
      }
      return {
        x: coordinate.x > nextOrigo.x ? coordinate.x - 1 : coordinate.x,
        y: coordinate.y > nextOrigo.y ? coordinate.y - 1 : coordinate.y
      };
    });
  }

  return { coordinates: nextCoordinates, origo: nextOrigo };
};
