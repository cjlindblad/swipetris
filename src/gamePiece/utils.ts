import { GAME_PIECE_TYPE } from './enums';
import DependencyContainer from '../dependencyContainer';
import { GameCharSelector } from '../config/types';
import { Coordinate, CoordinateData, RotationOptions } from './types';

export const getMinMaxCoordinates = (
  coordinates: Coordinate[]
): [Coordinate, Coordinate] => {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  coordinates.forEach((coordinate): void => {
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

  return [
    {
      x: minX,
      y: minY
    },
    {
      x: maxX,
      y: maxY
    }
  ];
};

// determines if longest side in piece has an odd (like a "T"-piece)
// or even (like a "I"-piece) amount of blocks
export const isLongestSideEven = (coordinates: Coordinate[]): boolean => {
  const [min, max] = getMinMaxCoordinates(coordinates);
  const xDistance = max.x - min.x + 1;
  const yDistance = max.y - min.y + 1;
  const longestDistance = xDistance > yDistance ? xDistance : yDistance;
  const isLongestDistanceEven = longestDistance % 2 === 0;

  return isLongestDistanceEven;
};

const pieceBag: GAME_PIECE_TYPE[] = [];
export const getNextPieceType = (): GAME_PIECE_TYPE => {
  const pieceTypes = [
    GAME_PIECE_TYPE.T,
    GAME_PIECE_TYPE.L,
    GAME_PIECE_TYPE.L_INVERTED,
    GAME_PIECE_TYPE.S,
    GAME_PIECE_TYPE.S_INVERTED,
    GAME_PIECE_TYPE.I,
    GAME_PIECE_TYPE.BLOCK
  ];

  if (pieceBag.length === 0) {
    pieceTypes.forEach(pieceType => {
      pieceBag.push(pieceType);
    });
  }

  const nextTypeIndex = Math.floor(Math.random() * pieceBag.length);

  const nextType = pieceBag.splice(nextTypeIndex, 1)[0];

  return nextType;
};

export const getPieceChar = (pieceType: GAME_PIECE_TYPE): string => {
  // TODO maybe inject these?
  const gameCharSelector = DependencyContainer.resolve(
    'gameCharSelector'
  ) as GameCharSelector; // TODO should be automatic

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

export const getInitialCoordinates = (
  pieceType: GAME_PIECE_TYPE,
  center: Coordinate
): Coordinate[] => {
  switch (pieceType) {
    case GAME_PIECE_TYPE.T:
      //  x
      // xxx
      return [
        {
          x: center.x,
          y: center.y - 1
        },
        {
          x: center.x - 1,
          y: center.y
        },
        {
          x: center.x,
          y: center.y
        },
        {
          x: center.x + 1,
          y: center.y
        }
      ];
    case GAME_PIECE_TYPE.L:
      //   x
      // xxx
      return [
        {
          x: center.x + 1,
          y: center.y - 1
        },
        {
          x: center.x - 1,
          y: center.y
        },
        {
          x: center.x,
          y: center.y
        },
        {
          x: center.x + 1,
          y: center.y
        }
      ];
    case GAME_PIECE_TYPE.L_INVERTED:
      // x
      // xxx
      return [
        {
          x: center.x - 1,
          y: center.y - 1
        },
        {
          x: center.x - 1,
          y: center.y
        },
        {
          x: center.x,
          y: center.y
        },
        {
          x: center.x + 1,
          y: center.y
        }
      ];
    case GAME_PIECE_TYPE.S:
      //  xx
      // xx
      return [
        {
          x: center.x,
          y: center.y - 1
        },
        {
          x: center.x + 1,
          y: center.y - 1
        },
        {
          x: center.x - 1,
          y: center.y
        },
        {
          x: center.x,
          y: center.y
        }
      ];
    case GAME_PIECE_TYPE.S_INVERTED:
      // xx
      //  xx
      return [
        {
          x: center.x - 1,
          y: center.y - 1
        },
        {
          x: center.x,
          y: center.y - 1
        },
        {
          x: center.x,
          y: center.y
        },
        {
          x: center.x + 1,
          y: center.y
        }
      ];
    case GAME_PIECE_TYPE.I:
      return [
        {
          x: center.x - 1,
          y: center.y
        },
        {
          x: center.x,
          y: center.y
        },
        {
          x: center.x + 1,
          y: center.y
        },
        {
          x: center.x + 2,
          y: center.y
        }
      ];
    case GAME_PIECE_TYPE.BLOCK:
      return [
        {
          x: center.x,
          y: center.y
        },
        {
          x: center.x + 1,
          y: center.y
        },
        {
          x: center.x,
          y: center.y + 1
        },
        {
          x: center.x + 1,
          y: center.y + 1
        }
      ];
    default:
      throw new Error(`Unknown piece type - ${pieceType}`);
  }
};

export const transpose = (
  coordinates: Coordinate[],
  origo: Coordinate,
  dx: number,
  dy: number
): CoordinateData => {
  return {
    coordinates: coordinates.map(
      (coordinate): Coordinate => ({
        x: coordinate.x + dx,
        y: coordinate.y + dy
      })
    ),
    origo: {
      x: origo.x + dx,
      y: origo.y + dy
    }
  };
};

// TODO refactor
export const getNextRotation = (
  args: CoordinateData & RotationOptions
): CoordinateData => {
  const { coordinates, origo, reverse } = args;
  // General rotation algorithm:
  // Keep track of origo and use relative positioning of all the pieces.
  // For each rotation: x2 = y1 * -1, y2 = x1

  let nextOrigo: Coordinate = {
    x: origo.x,
    y: origo.y
  };

  const needsTemporaryOrigoCross = isLongestSideEven(coordinates);

  let nextCoordinates: Coordinate[] = coordinates.map(
    (coordinate): Coordinate => {
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
    }
  );

  if (needsTemporaryOrigoCross) {
    nextOrigo = {
      x: nextOrigo.x + 1,
      y: nextOrigo.y + 1
    };
  }

  nextCoordinates = nextCoordinates.map(
    (coordinate): Coordinate => {
      const dx1 = coordinate.x - nextOrigo.x;
      const dy1 = coordinate.y - nextOrigo.y;

      let dx2: number;
      let dy2: number;

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
    }
  );

  // delete origo cross
  if (needsTemporaryOrigoCross) {
    nextOrigo = {
      x: nextOrigo.x - 1,
      y: nextOrigo.y - 1
    };

    nextCoordinates = nextCoordinates.map(
      (coordinate): Coordinate => {
        if (coordinate.x <= nextOrigo.x && coordinate.y <= nextOrigo.y) {
          return coordinate;
        }
        return {
          x: coordinate.x > nextOrigo.x ? coordinate.x - 1 : coordinate.x,
          y: coordinate.y > nextOrigo.y ? coordinate.y - 1 : coordinate.y
        };
      }
    );
  }

  return { coordinates: nextCoordinates, origo: nextOrigo };
};
