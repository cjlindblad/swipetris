import { GAME_PIECE_TYPES } from './gamePiece/index';

export const WEB_ENV = 'WEB_ENV';
export const TERMINAL_ENV = 'TERMINAL_ENV';

export const COLUMNS = 10;
export const ROWS = 16;

export const BASE_GRAVITY_DELAY = 800;

const GAME_CHARS = {
  [WEB_ENV]: {
    [GAME_PIECE_TYPES.L]: '😁',
    [GAME_PIECE_TYPES.L_INVERTED]: '😫',
    [GAME_PIECE_TYPES.S]: '😜',
    [GAME_PIECE_TYPES.S_INVERTED]: '🤗',
    [GAME_PIECE_TYPES.T]: '😮',
    [GAME_PIECE_TYPES.I]: '😎',
    [GAME_PIECE_TYPES.BLOCK]: '😅',
    [GAME_PIECE_TYPES.EMPTY_SPACE]: '〰️'
  },
  [TERMINAL_ENV]: {
    [GAME_PIECE_TYPES.L]: 'l',
    [GAME_PIECE_TYPES.L_INVERTED]: 'l',
    [GAME_PIECE_TYPES.S]: 's',
    [GAME_PIECE_TYPES.S_INVERTED]: 's',
    [GAME_PIECE_TYPES.T]: 't',
    [GAME_PIECE_TYPES.I]: 'i',
    [GAME_PIECE_TYPES.BLOCK]: 'o',
    [GAME_PIECE_TYPES.EMPTY_SPACE]: ' '
  }
};

export const createGameCharSelector = env => {
  const chars = GAME_CHARS[env];
  return char => chars[char];
};
