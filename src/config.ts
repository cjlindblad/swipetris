import { GAME_PIECE_TYPE } from './gamePiece/enums';

export const WEB_ENV = 'WEB_ENV';
export const TERMINAL_ENV = 'TERMINAL_ENV';

export const COLUMNS = 10;
export const ROWS = 16;

export const BASE_GRAVITY_DELAY = 800;

const GAME_CHARS = {
  [WEB_ENV]: {
    [GAME_PIECE_TYPE.L]: '😁',
    [GAME_PIECE_TYPE.L_INVERTED]: '😫',
    [GAME_PIECE_TYPE.S]: '😜',
    [GAME_PIECE_TYPE.S_INVERTED]: '🤗',
    [GAME_PIECE_TYPE.T]: '😮',
    [GAME_PIECE_TYPE.I]: '😎',
    [GAME_PIECE_TYPE.BLOCK]: '😅',
    [GAME_PIECE_TYPE.EMPTY_SPACE]: '〰️'
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
  }
};

export const createGameCharSelector = env => {
  const chars = GAME_CHARS[env];
  return char => chars[char];
};
