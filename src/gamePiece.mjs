import { INPUT_TYPES } from './inputHandling.mjs';

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
  const pieceTypes = Object.keys(GAME_PIECE_TYPES)
  const nextTypeIndex =
    Math.floor(Math.random() * pieceTypes.length) % pieceTypes.length; // better safe than sorry..
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
  let rotation = 0;
  let char = getPieceChar(pieceType);

  const getState = () => {
    const state = {
      coordinates,
      rotation,
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
      case INPUT_TYPES.INPUT_MAIN_ACTION:
        const nextRotationCoordinates = getNextRotation({
          coordinates,
          origo
        });
        return {
          coordinates: nextRotationCoordinates,
          rotation: (rotation + 1) % 4
        };
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
    if (nextState.rotation !== null && nextState.rotation !== undefined) {
      rotation = nextState.rotation;
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

// TODO will have to handle reverse rotation as well
const getNextRotation = ({ coordinates, origo }) => {
  // General rotation algorithm:
  // Keep track of origo and use relative positioning of all the pieces.
  // For each rotation: x2 = y1 * -1, y2 = x1

  // determine if longest side has an even or odd amount of blocks
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  coordinates.forEach(coordinate => {
    const { x, y } = coordinate;
    if (x > maxX) {
      maxX = x;
    }
    if (x < minX) {
      minX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
    if (y < minY) {
      minY = y;
    }
  });
  const xDistance = maxX - minX + 1;
  const yDistance = maxY - minY + 1;
  const longestDistance = xDistance > yDistance ? xDistance : yDistance;
  const isLongestDistanceEven = longestDistance % 2 === 0;

  // TODO don't change value of parameters..
  if (isLongestDistanceEven) {
    coordinates = coordinates.map(coordinate => {
      if (coordinate.x <= origo.x && coordinate.y <= origo.y) {
        return coordinate;
      }
      return {
        x: coordinate.x > origo.x ? coordinate.x + 1 : coordinate.x,
        y: coordinate.y > origo.y ? coordinate.y + 1 : coordinate.y
      }
    });

    origo = {
      x: origo.x + 1,
      y: origo.y + 1,
    };
  }
  
  let rotadedCoordinates = coordinates
    .map(coordinate => {
    const dx1 = coordinate.x - origo.x;
    const dy1 = coordinate.y - origo.y;

    const dx2 = dy1 * -1;
    const dy2 = dx1;

    const x2 = origo.x + dx2;
    const y2 = origo.y + dy2;

    return {
      x: x2,
      y: y2
    };
  });

  // delete origo cross
  if (isLongestDistanceEven) {
    // TODO DON'T do this..
    // use a temp variable instead
    origo = {
      x: origo.x - 1,
      y: origo.y - 1,
    };

    rotadedCoordinates = rotadedCoordinates.map(coordinate => {
      if (coordinate.x <= origo.x && coordinate.y <= origo.y) {
        return coordinate;
      }
      return {
        x: coordinate.x > origo.x ? coordinate.x - 1 : coordinate.x,
        y: coordinate.y > origo.y ? coordinate.y - 1 : coordinate.y
      }
      });
  }

  return rotadedCoordinates;
};
