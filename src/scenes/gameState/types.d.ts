import { GamePiece } from '../../gamePiece/types';

interface GetGameStateRepresentation {
  (): GameStateRepresentation;
}

interface GameStateRepresentation {
  renderString?: string; // migrate away from this
  nextPieceString: string;
  score: number;
  level: number;
  gameBoard?: string[][];
  nextPiece?: GamePiece;
  ghostPiece?: GamePiece;
}
