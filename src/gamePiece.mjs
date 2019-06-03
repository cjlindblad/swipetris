import { INPUT_TYPES } from './inputHandling.mjs';

// the pieces actually have names.
// https://www.joe.co.uk/gaming/tetris-block-names-221127
export const GAME_PIECE_TYPES = {
  TEEWEE: 'TEEWEE',
  CLEVELAND: 'CLEVELAND'
};

// piece rotation would work like this

// TODO: general rotation algorithm
// Keep track of origo and use relative positioning of all the pieces.
// For each rotation: x2 = y1 * -1, y2 = x1

// .... ..x. .... .x..
// xxxx ..x. .... .x..
// .... ..x. xxxx .x..
// .... ..x. .... .x..

// Teewee
// xxx ..x ... x..
// .x. .xx .x. xx.
// ... ..x xxx x..

// Cleveland
// xx. ..x ... .x.
// .xx .xx xx. xx.
// ... .x. .xx x..

// Rhode Island
// .xx .x. ... x..
// xx. .xx .xx xx.
// ... ..x xx. .x.

// Smashboy
// xx xx xx xx
// xx xx xx xx

// TODO L-pieces!

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
  const { topLeftX, topLeftY, pieceType } = initialState;

  let coordinates = getInitialCoordinates({
    pieceType,
    topLeftX,
    topLeftY
  });

  // initial values
  let rotation = 0;
  let active = true;

  const getState = () => ({
    coordinates,
    rotation
  });

  const getNextState = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x - 1,
            y: coordinate.y
          }))
        };
      case INPUT_TYPES.INPUT_RIGHT:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x + 1,
            y: coordinate.y
          }))
        };
      case INPUT_TYPES.INPUT_UP:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x,
            y: coordinate.y - 1
          }))
        };
      case INPUT_TYPES.INPUT_DOWN:
        return {
          coordinates: coordinates.map(coordinate => ({
            x: coordinate.x,
            y: coordinate.y + 1
          }))
        };
      case INPUT_TYPES.INPUT_MAIN_ACTION:
        const nextRotationCoordinates = getNextRotation({
          pieceType,
          coordinates,
          rotation
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
          }))
        };
      default:
        throw new Error(`Unknown input - ${input}`);
    }
  };

  const isActive = () => active;

  const setState = nextState => {
    // TODO generalize and clean up this..
    if (nextState.coordinates !== null && nextState.coordinates !== undefined) {
      coordinates = nextState.coordinates;
    }
    if (nextState.rotation !== null && nextState.rotation !== undefined) {
      rotation = nextState.rotation;
    }
    if (nextState.active !== null && nextState.active !== undefined) {
      active = nextState.active;
    }
  };

  // public API
  return {
    getNextState,
    setState,
    getState,
    isActive
  };
};

const getInitialCoordinates = ({ pieceType, topLeftX, topLeftY }) => {
  switch (pieceType) {
    case GAME_PIECE_TYPES.TEEWEE:
      // xxx
      //  x
      return [
        {
          x: topLeftX,
          y: topLeftY
        },
        {
          x: topLeftX + 1,
          y: topLeftY
        },
        {
          x: topLeftX + 2,
          y: topLeftY
        },
        {
          x: topLeftX + 1,
          y: topLeftY + 1
        }
      ];
    default:
      throw new Error(`Unknown piece type - ${pieceType}`);
  }
};

// will have to handle reverse rotation as well
const getNextRotation = ({ pieceType, coordinates, rotation }) => {
  switch (pieceType) {
    case GAME_PIECE_TYPES.TEEWEE:
      // not very elegant. we'll see if we can come up with something better later on.
      if (rotation === 0) {
        const topLeftX = coordinates[0].x;
        const topLeftY = coordinates[0].y;

        // xxx        x
        //  x   ->   xx
        //            x

        return [
          {
            x: topLeftX + 2,
            y: topLeftY
          },
          {
            x: topLeftX + 1,
            y: topLeftY + 1
          },
          {
            x: topLeftX + 2,
            y: topLeftY + 1
          },
          {
            x: topLeftX + 2,
            y: topLeftY + 2
          }
        ];
      }
      if (rotation === 1) {
        const topRightX = coordinates[0].x;
        const topRightY = coordinates[0].y;

        //   x
        //  xx  ->   x
        //   x      xxx

        return [
          {
            x: topRightX - 1,
            y: topRightY + 1
          },
          {
            x: topRightX - 2,
            y: topRightY + 2
          },
          {
            x: topRightX - 1,
            y: topRightY + 2
          },
          {
            x: topRightX,
            y: topRightY + 2
          }
        ];
      }
      if (rotation === 2) {
        const middleX = coordinates[0].x;
        const middleY = coordinates[0].y;

        //          x
        //  x   ->  xx
        // xxx      x

        return [
          {
            x: middleX - 1,
            y: middleY - 1
          },
          {
            x: middleX - 1,
            y: middleY
          },
          {
            x: middleX,
            y: middleY
          },
          {
            x: middleX - 1,
            y: middleY + 1
          }
        ];
      }
      if (rotation === 3) {
        const topLeftX = coordinates[0].x;
        const topLeftY = coordinates[0].y;

        // x       xxx
        // xx  ->   x
        // x

        return [
          {
            x: topLeftX,
            y: topLeftY
          },
          {
            x: topLeftX + 1,
            y: topLeftY
          },
          {
            x: topLeftX + 2,
            y: topLeftY
          },
          {
            x: topLeftX + 1,
            y: topLeftY + 1
          }
        ];
      }
      throw new Error(`Unknown rotation - ${rotation}`);
    default:
      throw new Error(`Unknown piece type - ${pieceType}`);
  }
};
