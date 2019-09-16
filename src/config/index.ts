import { GAME_PIECE_TYPE } from '../gamePiece/enums';
import { GameCharSelector } from './types';

export const WEB_ENV = 'WEB_ENV';
export const TERMINAL_ENV = 'TERMINAL_ENV';
export const TEST_ENV = 'TEST_ENV';

export const COLUMNS = 10;
export const ROWS = 16;

const GAME_CHARS: Record<string, Record<string, string>> = {
  [WEB_ENV]: {
    [GAME_PIECE_TYPE.L]: 'l',
    [GAME_PIECE_TYPE.L_INVERTED]: 'j',
    [GAME_PIECE_TYPE.S]: 's',
    [GAME_PIECE_TYPE.S_INVERTED]: 'z',
    [GAME_PIECE_TYPE.T]: 't',
    [GAME_PIECE_TYPE.I]: 'i',
    [GAME_PIECE_TYPE.BLOCK]: 'o',
    [GAME_PIECE_TYPE.EMPTY_SPACE]: ' '
  },
  [TERMINAL_ENV]: {
    [GAME_PIECE_TYPE.L]: 'l',
    [GAME_PIECE_TYPE.L_INVERTED]: 'l',
    [GAME_PIECE_TYPE.S]: 's',
    [GAME_PIECE_TYPE.S_INVERTED]: 's',
    [GAME_PIECE_TYPE.T]: 't',
    [GAME_PIECE_TYPE.I]: 'i',
    [GAME_PIECE_TYPE.BLOCK]: 'o',
    [GAME_PIECE_TYPE.EMPTY_SPACE]: ' '
  },
  [TEST_ENV]: {
    [GAME_PIECE_TYPE.L]: 'l',
    [GAME_PIECE_TYPE.L_INVERTED]: 'l',
    [GAME_PIECE_TYPE.S]: 's',
    [GAME_PIECE_TYPE.S_INVERTED]: 's',
    [GAME_PIECE_TYPE.T]: 't',
    [GAME_PIECE_TYPE.I]: 'i',
    [GAME_PIECE_TYPE.BLOCK]: 'o',
    [GAME_PIECE_TYPE.EMPTY_SPACE]: ' '
  }
};

export const createGameCharSelector = (env: string): GameCharSelector => {
  const chars = GAME_CHARS[env];
  return (char: GAME_PIECE_TYPE): string => chars[char];
};
