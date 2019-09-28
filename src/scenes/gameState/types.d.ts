import { GamePiece } from '../../gamePiece/types';
import { Options } from '../../options/types';
import { Name } from '../../highScore/types';

interface GetGameStateRepresentation {
  (): GameStateRepresentation;
}

interface GameStateRepresentation {
  renderString?: string; // migrate away from this
  nextPieceString: string;
  score: number;
  level: number;
  clearedLines: number;
  gameBoard?: string[][];
  nextPiece?: GamePiece;
  ghostPiece?: GamePiece;
  options?: Options;
  name?: Name;
}
