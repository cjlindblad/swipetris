import { Render } from './types';
import { GameCharSelector } from '../config/types';
import DependencyContainer from '../dependencyContainer';
import { GAME_PIECE_TYPE } from '../gamePiece/enums';
import { COLUMNS, ROWS } from '../config';

export const render: Render = param => {
  const gameCharSelector: GameCharSelector = DependencyContainer.resolve(
    'gameCharSelector'
  ) as GameCharSelector; // TODO should be automatic
  const EMPTY_SPACE_CHAR = gameCharSelector(GAME_PIECE_TYPE.EMPTY_SPACE);

  const { renderString, gameBoard, nextPiece, score } = param;

  if (!renderString) {
    throw new Error('Render string was not supplied to render function');
  }

  // TODO extract initialization logic

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  if (!canvas) {
    throw new Error('Could not find canvas element');
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not find context element');
  }

  const CANVAS_HEIGHT = window.innerHeight;
  const CANVAS_WIDTH = CANVAS_HEIGHT / 2;

  ctx.canvas.height = CANVAS_HEIGHT;
  ctx.canvas.width = CANVAS_WIDTH;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const INITIAL_Y = 0;
  const INITIAL_X = 0;
  const CELL_WIDTH = CANVAS_WIDTH / COLUMNS;
  const CELL_HEIGHT = CELL_WIDTH;
  if (gameBoard) {
    ctx.fillStyle = 'rgb(255, 0, 0)';
    for (let y = 0; y < gameBoard.length; y++) {
      for (let x = 0; x < gameBoard[0].length; x++) {
        const cell = gameBoard[y][x];
        if (cell !== EMPTY_SPACE_CHAR) {
          ctx.fillRect(
            INITIAL_X + x * CELL_WIDTH,
            INITIAL_Y + y * CELL_HEIGHT,
            CELL_WIDTH,
            CELL_HEIGHT
          );
        }
      }
    }
  }

  // test for rendering render string

  // const LINE_HEIGHT = 25;
  // const lines = renderString.split('\n');
  // let startY = 100;
  // ctx.fillStyle = 'rgb(0, 0, 0)';
  // ctx.font = '20px monospace';
  // lines.forEach(line => {
  //   ctx.fillText(line, 50, startY);
  //   startY += LINE_HEIGHT;
  // });
};

export default render;
