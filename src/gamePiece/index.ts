import { INPUT_TYPE } from '../input/enums';
import {
  getMinMaxCoordinates,
  transpose,
  getNextRotation,
  getInitialCoordinates,
  getPieceChar
} from './utils';
import { GAME_PIECE_TYPE } from './enums';
import {
  Coordinate,
  GamePiece,
  CoordinateData,
  SetState,
  GetPreview,
  GetChar,
  GetNextState,
  GetState
} from './types';
import { EventType } from '../eventDispatcher/enums';

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
  const [min] = getMinMaxCoordinates(coordinates);
  for (let y = min.y; y > 0; y--) {
    const transposition = transpose(coordinates, origo, 0, -1);
    coordinates = transposition.coordinates;
    origo = transposition.origo;
  }

  // initial values
  let char = getPieceChar(pieceType);
  let moves = 0;

  const getState: GetState = () => {
    const state = {
      coordinates,
      origo,
      moves
    };
    return state;
  };

  const getNextTransposition = (eventType: EventType): CoordinateData => {
    switch (eventType) {
      case EventType.InputLeft:
        return transpose(coordinates, origo, -1, 0);
      case EventType.InputRight:
        return transpose(coordinates, origo, 1, 0);
      case EventType.InputUp:
        return transpose(coordinates, origo, 0, -1);
      case EventType.InputDown:
        return transpose(coordinates, origo, 0, 1);
      case EventType.Rotate: {
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
      case EventType.RotateReverse: {
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
      case EventType.GravityDrop:
        // same as input down, but I think we're gonna rebuild this
        return transpose(coordinates, origo, 0, 1);
      default:
        // don't alter anything
        return {
          coordinates,
          origo
        };
    }
  };

  const getNextState: GetNextState = eventType => {
    const transposition = getNextTransposition(eventType);
    return { ...transposition, moves };
  };

  const getChar: GetChar = () => char;

  const setState: SetState = nextState => {
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

  const getPreview: GetPreview = () =>
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
