import { INPUT_TYPES } from './inputHandling.mjs';

/*

piece rotation would work like this

.... ..x. .... .x..
xxxx ..x. .... .x..
.... ..x. xxxx .x..
.... ..x. .... .x..

xxx ..x ... x..
.x. .xx .x. xx.
... ..x xxx x..

xx. ..x ... .x.
.xx .xx xx. xx.
... .x. .xx x..

.xx .x. ... x.. 
xx. .xx .xx xx.
... ..x xx. .x.

xx xx xx xx
xx xx xx xx

*/

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
  const { x, y } = initialState;
  let _x = x;
  let _y = y;

  const getState = () => ({
    x: _x,
    y: _y
  });

  const getNextState = input => {
    switch (input) {
      case INPUT_TYPES.INPUT_LEFT:
        return {
          x: _x - 1,
          y: _y
        };
      case INPUT_TYPES.INPUT_RIGHT:
        return {
          x: _x + 1,
          y: _y
        };
      case INPUT_TYPES.INPUT_UP:
        return {
          x: _x,
          y: _y - 1
        };
      case INPUT_TYPES.INPUT_DOWN:
        return {
          x: _x,
          y: _y + 1
        };
      default:
        throw new Error(`Unknown input - ${input}`);
    }
  };

  const setState = nextState => {
    _x = nextState.x;
    _y = nextState.y;
  };

  // public API
  return {
    getNextState,
    setState,
    getState
  };
};
