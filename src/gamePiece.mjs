import { INPUT_TYPES } from './inputHandling.mjs';

// the pieces actually have names.
// https://www.joe.co.uk/gaming/tetris-block-names-221127
export const GAME_PIECE_TYPES = {
  TEEWEE: 'TEEWEE',
  CLEVELAND: 'CLEVELAND'
};

// piece rotation would work like this

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

  const getState = () => ({
    coordinates
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
      default:
        throw new Error(`Unknown input - ${input}`);
    }
  };

  const setState = nextState => {
    coordinates = nextState.coordinates;
  };

  // public API
  return {
    getNextState,
    setState,
    getState
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
