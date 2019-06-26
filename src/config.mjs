import { GAME_PIECE_TYPES } from './gamePiece/index.mjs';

export const WEB_ENV = 'WEB_ENV';
export const TERMINAL_ENV = 'TERMINAL_ENV';

export const COLUMNS = 8;
export const ROWS = 12;

const GAME_CHARS = {
  [WEB_ENV]: {
    [GAME_PIECE_TYPES.L]: '😁',
    [GAME_PIECE_TYPES.L_INVERTED]: '😫',
    [GAME_PIECE_TYPES.S]: '😜',
    [GAME_PIECE_TYPES.S_INVERTED]: '🤗',
    [GAME_PIECE_TYPES.T]: '😮',
    [GAME_PIECE_TYPES.I]: '😎',
    [GAME_PIECE_TYPES.BLOCK]: '😅',
    [GAME_PIECE_TYPES.EMPTY_SPACE]: '️️️️️️️〰️'
  },
  [TERMINAL_ENV]: {
    [GAME_PIECE_TYPES.L]: 'x',
    [GAME_PIECE_TYPES.L_INVERTED]: 'x',
    [GAME_PIECE_TYPES.S]: 'x',
    [GAME_PIECE_TYPES.S_INVERTED]: 'x',
    [GAME_PIECE_TYPES.T]: 'x',
    [GAME_PIECE_TYPES.I]: 'x',
    [GAME_PIECE_TYPES.BLOCK]: 'x',
    [GAME_PIECE_TYPES.EMPTY_SPACE]: '️️️️️️️ '
  }
};

export const createGameCharSelector = env => {
  const chars = GAME_CHARS[env];
  return char => chars[char];
};
