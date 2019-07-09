import { INPUT_TYPES } from '../input/constants';
import { isLongestSideEven, getMinMaxCoordinates, transpose } from './utils';
import DependencyContainer from '../dependencyContainer';

export enum GAME_PIECE_TYPE {
  T = 1,
  L,
  L_INVERTED,
  S,
  S_INVERTED,
  I,
  BLOCK,
  EMPTY_SPACE
}

export const getNextPieceType = (): GAME_PIECE_TYPE => {
  // might be a cleaner way to write this
  // (we want to filter out GAME_PIECE_TYPE.EMPTY_SPACE)
  const pieceTypes = [
    GAME_PIECE_TYPE.T,
    GAME_PIECE_TYPE.L,
    GAME_PIECE_TYPE.L_INVERTED,
    GAME_PIECE_TYPE.S,
    GAME_PIECE_TYPE.S_INVERTED,
    GAME_PIECE_TYPE.I,
    GAME_PIECE_TYPE.BLOCK
  ];
  const nextTypeIndex = Math.floor(Math.random() * pieceTypes.length);
  return pieceTypes[nextTypeIndex];
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

  // make sure piece starts from the top
  const [min, _] = getMinMaxCoordinates(coordinates);
  for (let y = min.y; y > 0; y--) {
    const transposition = transpose(coordinates, origo, 0, -1);
    coordinates = transposition.coordinates;
    origo = transposition.origo;
  }

  // initial values
  let char = getPieceChar(pieceType);
  let moves = 0;

  const getState = () => {
    const state = {
      coordinates,
      origo,
      moves
    };
    return state;
  };

  const getNextState = input => {
    const transposition = getNextTransposition(input);
    return { ...transposition, moves };
  };

  const getNextTransposition = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
        return transpose(coordinates, origo, -1, 0);
      case INPUT_TYPES.INPUT_RIGHT:
        return transpose(coordinates, origo, 1, 0);
      case INPUT_TYPES.INPUT_UP:
        return transpose(coordinates, origo, 0, -1);
      case INPUT_TYPES.INPUT_DOWN:
        return transpose(coordinates, origo, 0, 1);
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
        return transpose(coordinates, origo, 0, 1);
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
    if (nextState.moves !== null && nextState.moves !== undefined) {
      moves = nextState.moves;
    }
  };

  const getPreview = () =>
    getInitialCoordinates({ pieceType, centerX: 0, centerY: 0 });

  // public API
  return {
    getNextState,
    setState,
    getState,
    getChar,
    getPreview
  };
};

const getPieceChar = (pieceType: GAME_PIECE_TYPE) => {
  // TODO maybe inject these?
  const dependencyContainer = new DependencyContainer();
  const gameCharSelector = dependencyContainer.resolve('gameCharSelector');

  switch (pieceType) {
    case GAME_PIECE_TYPE.L:
    case GAME_PIECE_TYPE.L_INVERTED:
    case GAME_PIECE_TYPE.S:
    case GAME_PIECE_TYPE.S_INVERTED:
    case GAME_PIECE_TYPE.T:
    case GAME_PIECE_TYPE.I:
    case GAME_PIECE_TYPE.BLOCK:
      return gameCharSelector(pieceType);
    default:
      throw new Error(`Unknown piece type - ${pieceType}`);
  }
};

const getInitialCoordinates = ({ pieceType, centerX, centerY }) => {
  switch (pieceType) {
    case GAME_PIECE_TYPE.T:
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
    case GAME_PIECE_TYPE.L:
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
    case GAME_PIECE_TYPE.L_INVERTED:
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
    case GAME_PIECE_TYPE.S:
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
    case GAME_PIECE_TYPE.S_INVERTED:
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
    case GAME_PIECE_TYPE.I:
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
    case GAME_PIECE_TYPE.BLOCK:
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
