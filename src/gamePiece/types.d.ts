import { INPUT_TYPE } from '../input/enums';
import { EventType } from '../eventDispatcher/enums';
import { GAME_PIECE_TYPE } from './enums';

interface Coordinate {
  x: number;
  y: number;
}

interface CoordinateData {
  coordinates: Coordinate[];
  origo: Coordinate;
}

interface RotationOptions {
  reverse?: boolean;
}

interface GamePieceState {
  coordinates: Coordinate[];
  origo: Coordinate;
  moves?: number;
}

interface GamePiece {
  getNextState: GetNextState;
  setState: SetState;
  getState: GetState;
  getChar: GetChar;
  getPreview: GetPreview;
  getType: GetType;
}

interface GetNextState {
  (eventType: EventType): GamePieceState;
}

interface SetState {
  (nextState: GamePieceState): void;
}

interface GetState {
  (): GamePieceState;
}

interface GetChar {
  (): string;
}

interface GetPreview {
  (): Coordinate[];
}

interface GetType {
  (): GAME_PIECE_TYPE;
}
