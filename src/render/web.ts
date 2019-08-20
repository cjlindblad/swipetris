import { Render } from './types';

export const render: Render = param => {
  const { renderString, nextPiece, score } = param;

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

  const LINE_HEIGHT = 25;
  const lines = renderString.split('\n');
  let startY = 100;

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '20px monospace';
  lines.forEach(line => {
    ctx.fillText(line, 50, startY);
    startY += LINE_HEIGHT;
  });
};

export default render;
