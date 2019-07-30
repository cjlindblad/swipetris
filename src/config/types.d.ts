import { GAME_PIECE_TYPE } from '../gamePiece/enums';

export interface GameCharSelector {
  (char: GAME_PIECE_TYPE): string;
}
