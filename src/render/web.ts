import { Render } from './types';
import { GAME_PIECE_TYPE } from '../gamePiece/enums';
import { getMinMaxCoordinates, transpose } from '../gamePiece/utils';
import { WEB_ENV, COLUMNS, ROWS, createGameCharSelector } from '../config';
import { GameState } from '../scenes/gameState';
import Color from './color';
import { lineWrap } from '../underdash';

import terminalRender from './terminal';

const T_COLOR = new Color(171, 0, 235);
const L_COLOR = new Color(252, 158, 0);
const L_INVERTED_COLOR = new Color(45, 0, 248);
const S_COLOR = new Color(0, 254, 0);
const S_INVERTED_COLOR = new Color(255, 0, 0);
const I_COLOR = new Color(0, 185, 224);
const BLOCK_COLOR = new Color(237, 247, 0);

const createRender = (): Render => {
  const gameCharSelector = createGameCharSelector(WEB_ENV);

  // could be cleaner
  const EMPTY_SPACE_CHAR = gameCharSelector(GAME_PIECE_TYPE.EMPTY_SPACE);

  const T = gameCharSelector(GAME_PIECE_TYPE.T);
  const L = gameCharSelector(GAME_PIECE_TYPE.L);
  const L_INVERTED = gameCharSelector(GAME_PIECE_TYPE.L_INVERTED);
  const S = gameCharSelector(GAME_PIECE_TYPE.S);
  const S_INVERTED = gameCharSelector(GAME_PIECE_TYPE.S_INVERTED);
  const I = gameCharSelector(GAME_PIECE_TYPE.I);
  const BLOCK = gameCharSelector(GAME_PIECE_TYPE.BLOCK);

  const getPieceColor = (piece: string): Color => {
    switch (piece) {
      case T:
        return T_COLOR;
      case L:
        return L_COLOR;
      case L_INVERTED:
        return L_INVERTED_COLOR;
      case S:
        return S_COLOR;
      case S_INVERTED:
        return S_INVERTED_COLOR;
      case I:
        return I_COLOR;
      case BLOCK:
        return BLOCK_COLOR;
      default:
        return new Color(255, 255, 255);
    }
  };

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  if (!canvas) {
    throw new Error('Could not find canvas element');
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not find context element');
  }

  const CANVAS_HEIGHT_PADDING = 50;
  const CANVAS_HEIGHT = window.innerHeight - CANVAS_HEIGHT_PADDING;
  const CANVAS_WIDTH = CANVAS_HEIGHT / 2;

  ctx.canvas.height = CANVAS_HEIGHT;
  ctx.canvas.width = CANVAS_WIDTH;

  const CELL_WIDTH = CANVAS_WIDTH / COLUMNS;
  const CELL_HEIGHT = CELL_WIDTH;
  const INITIAL_Y = CANVAS_HEIGHT - ROWS * CELL_HEIGHT;
  const INITIAL_X = 0;

  const render: Render = (param, gameState) => {
    const {
      renderString,
      gameBoard,
      nextPiece,
      score,
      level,
      ghostPiece,
      clearedLines,
      options,
      name
    } = param;

    if (options && options.consoleRenderingActive) {
      terminalRender(param, gameState);
    } else {
      console.clear();
    }

    // TODO pass which screen we are rendering, instead of checking gameState

    if (!renderString) {
      throw new Error('Render string was not supplied to render function');
    }

    // (comment for trailing effect)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // draw game board background
    ctx.fillStyle = new Color(255, 255, 255, 0.25).toString();
    ctx.fillRect(INITIAL_X, INITIAL_Y, CANVAS_WIDTH, CANVAS_HEIGHT - INITIAL_Y);

    // render functions for different parts of UI
    const renderNextPiece = (): void => {
      if (nextPiece) {
        const PREVIEW_WIDTH = CELL_WIDTH / 2;
        const PREVIEW_HEIGHT = CELL_HEIGHT / 2;

        const INITIAL_X = CANVAS_WIDTH - 5 * PREVIEW_WIDTH;
        const INITIAL_Y = 0;

        ctx.fillStyle = new Color(0, 0, 0).toString();
        ctx.font = '18px monospace';
        ctx.fillText('Next:', INITIAL_X - 60, INITIAL_Y + 20);

        const color = getPieceColor(nextPiece.getChar());
        ctx.fillStyle = color.toString();

        const { coordinates, origo } = nextPiece.getState();
        const [min] = getMinMaxCoordinates(coordinates);
        transpose(coordinates, origo, min.x * -1, 0).coordinates.forEach(
          coordinate => {
            const { x, y } = coordinate;

            ctx.fillRect(
              INITIAL_X + PREVIEW_WIDTH * x,
              INITIAL_Y + PREVIEW_HEIGHT * y,
              PREVIEW_WIDTH,
              PREVIEW_HEIGHT
            );
          }
        );
      }
    };

    const renderGameBoard = (): void => {
      if (gameBoard) {
        for (let y = 0; y < gameBoard.length; y++) {
          for (let x = 0; x < gameBoard[0].length; x++) {
            const cell = gameBoard[y][x];
            if (cell !== EMPTY_SPACE_CHAR) {
              const color = getPieceColor(cell);
              ctx.fillStyle = color.toString();
              ctx.fillRect(
                INITIAL_X + x * CELL_WIDTH,
                INITIAL_Y + y * CELL_HEIGHT,
                CELL_WIDTH,
                CELL_HEIGHT
              );

              ctx.strokeStyle = new Color(0, 0, 0).toString();
              ctx.lineWidth = 1;
              ctx.strokeRect(
                INITIAL_X + x * CELL_WIDTH,
                INITIAL_Y + y * CELL_HEIGHT,
                CELL_WIDTH,
                CELL_HEIGHT
              );
            }
          }
        }
      }
    };

    const renderGhostPiece = (): void => {
      if (ghostPiece) {
        const color = getPieceColor(ghostPiece.getChar()).setAlpha(0.15);
        ctx.fillStyle = color.toString();
        ghostPiece.getState().coordinates.forEach(({ x, y }) => {
          ctx.fillRect(
            INITIAL_X + x * CELL_WIDTH,
            INITIAL_Y + y * CELL_HEIGHT,
            CELL_WIDTH,
            CELL_HEIGHT
          );
        });
      }
    };

    const renderMenuChoice = (): void => {
      const TEXT_COLOR = new Color(0, 0, 0).toString();
      const TEXT_FONT = '18px monospace';
      ctx.fillStyle = TEXT_COLOR;
      ctx.font = TEXT_FONT;

      const lines = renderString.split('\n');

      const FONT_SIZE = 16;
      ctx.font = `${FONT_SIZE}px monospace`;
      const LINE_HEIGHT = CELL_HEIGHT;
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(
          lines[i],
          CELL_WIDTH,
          INITIAL_Y + 2 * CELL_HEIGHT + i * LINE_HEIGHT
        );
      }
    };

    const renderHUD = (): void => {
      const START_Y = 20;
      const LINE_HEIGHT = 25;
      const TEXT_COLOR = new Color(0, 0, 0).toString();
      const TEXT_FONT = '18px monospace';
      ctx.fillStyle = TEXT_COLOR;
      ctx.font = TEXT_FONT;
      ctx.fillText(`Level: ${level}`, 0, START_Y);
      ctx.fillText(`Score: ${score}`, 0, START_Y + LINE_HEIGHT);
      ctx.fillText(
        `Cleared lines: ${clearedLines}`,
        0,
        START_Y + 2 * LINE_HEIGHT
      );
    };

    const renderModal = (
      text: string,
      highlightedCharacterIndex?: number
    ): void => {
      const MODAL_HORIZONTAL_PADDING = CELL_WIDTH;
      const MODAL_MARGIN_TOP = CELL_HEIGHT * 2;
      const MODAL_INNER_PADDING = CELL_WIDTH;

      const charactersPerLine =
        (CANVAS_WIDTH -
          2 * MODAL_HORIZONTAL_PADDING -
          2 * MODAL_INNER_PADDING) /
        (CELL_WIDTH / 2);
      const lines = lineWrap(text, charactersPerLine).split('\n');

      const MODAL_HEIGHT = CELL_HEIGHT * 2 + CELL_HEIGHT * lines.length;

      ctx.fillStyle = new Color(0, 0, 0, 0.5).toString();
      ctx.fillRect(
        MODAL_HORIZONTAL_PADDING,
        INITIAL_Y + MODAL_MARGIN_TOP,
        CANVAS_WIDTH - MODAL_HORIZONTAL_PADDING * 2,
        MODAL_HEIGHT
      );

      ctx.fillStyle = new Color(255, 255, 255).toString();
      const FONT_SIZE = CELL_WIDTH / 2;
      ctx.font = `${FONT_SIZE}px monospace`;
      const LINE_HEIGHT = CELL_HEIGHT;
      let charCount = 0;
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
          const textX =
            MODAL_HORIZONTAL_PADDING +
            MODAL_INNER_PADDING +
            charIndex * (CELL_WIDTH / 3);
          const textY =
            INITIAL_Y +
            MODAL_MARGIN_TOP +
            FONT_SIZE +
            MODAL_INNER_PADDING +
            lineIndex * LINE_HEIGHT;

          ctx.fillText(line.charAt(charIndex), textX, textY);
          if (
            highlightedCharacterIndex &&
            highlightedCharacterIndex === charCount
          ) {
            ctx.fillText('_', textX, textY);
          }
          charCount++;
        }
      }
    };

    // trigger render functions
    renderNextPiece();
    renderGhostPiece();
    renderGameBoard();
    if (gameState) {
      renderHUD();
    }
    if (!gameState) {
      renderMenuChoice();
    }
    if (gameState && gameState === GameState.GameOver) {
      renderModal('Game over!\n(r) restart\n(q) quit');
    }
    if (gameState && gameState === GameState.HighScore) {
      if (name) {
        const prefix = `High score! ${score}\n$`;
        const prefixLength = prefix.length;
        const highLightedIndex = prefixLength + (name.getIndex() - 1);
        renderModal(
          `High score! ${score}\n${name.getName()}`,
          highLightedIndex
        );
      }
    }
    if (gameState && gameState === GameState.Paused) {
      renderModal('Game paused. Press "q" to exit to menu.');
    }
  };

  return render;
};

export default createRender;
