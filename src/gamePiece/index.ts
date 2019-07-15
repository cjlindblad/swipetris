import { INPUT_TYPE } from '../input/enums';
import {
  getMinMaxCoordinates,
  transpose,
  getNextRotation,
  getInitialCoordinates,
  getPieceChar
} from './utils';
import { GAME_PIECE_TYPE } from './enums';

interface GamePieceState {
  coordinates: Coordinate[];
  origo: Coordinate;
  moves?: number;
}

// TODO duplicate type definitions
interface GamePiece {
  getNextState: (input: INPUT_TYPE) => GamePieceState;
  setState: (nextState: GamePieceState) => void;
  getState: () => GamePieceState;
  getChar: () => string;
  getPreview: () => Coordinate[];
}

// Borrowing some React wording here.
//
// I'm thinking that a given game piece
// should return it's next state on
// any given input, and let external
// logic decide if it's a valid move.
//
// So state updates will happen separately
// from input handling.
export const createGamePiece = (
  pieceType: GAME_PIECE_TYPE,
  center: Coordinate
): GamePiece => {
  let coordinates = getInitialCoordinates(pieceType, center);

  let origo = {
    x: center.x,
    y: center.y
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

  const getState = (): GamePieceState => {
    const state = {
      coordinates,
      origo,
      moves
    };
    return state;
  };

  const getNextState = (input: INPUT_TYPE): GamePieceState => {
    const transposition = getNextTransposition(input);
    return { ...transposition, moves };
  };

  const getNextTransposition = (input: INPUT_TYPE): CoordinateData => {
    switch (input) {
      case INPUT_TYPE.INPUT_LEFT:
        return transpose(coordinates, origo, -1, 0);
      case INPUT_TYPE.INPUT_RIGHT:
        return transpose(coordinates, origo, 1, 0);
      case INPUT_TYPE.INPUT_UP:
        return transpose(coordinates, origo, 0, -1);
      case INPUT_TYPE.INPUT_DOWN:
        return transpose(coordinates, origo, 0, 1);
      case INPUT_TYPE.ROTATE: {
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
      case INPUT_TYPE.ROTATE_REVERSE: {
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
      case INPUT_TYPE.GRAVITY_DROP:
        // same as input down, but I think we're gonna rebuild this
        return transpose(coordinates, origo, 0, 1);
      default:
        throw new Error(`Unknown input - ${input}`);
    }
  };

  const getChar = (): string => char;

  const setState = (nextState: GamePieceState): void => {
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

  const getPreview = (): Coordinate[] =>
    getInitialCoordinates(pieceType, { x: 0, y: 0 });

  // public API
  return {
    getNextState,
    setState,
    getState,
    getChar,
    getPreview
  };
};
