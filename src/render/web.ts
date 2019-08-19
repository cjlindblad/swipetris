import { Render } from './types';

export const render: Render = param => {
  const { renderString, nextPiece, score } = param;

  const gameboardElement = document.getElementById('input');
  const scoreElement = document.getElementById('score');
  const nextElement = document.getElementById('next');

  if (!gameboardElement || !scoreElement || !nextElement) {
    throw new Error('Could not find game elements');
  }

  gameboardElement.innerText = renderString;
  scoreElement.innerText = String(score);
  nextElement.innerText = nextPiece;
};

export default render;
