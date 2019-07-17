import { GAME_PIECE_TYPE } from '../gamePiece/enums';

export interface IGameCharSelector {
  (char: GAME_PIECE_TYPE): string;
}
