export const render = (param: IRenderParam) => {
  const { renderString, nextPiece, score } = param;

  const gameboardElement = document.getElementById('input');
  gameboardElement.innerText = renderString;
  const scoreElement = document.getElementById('score');
  scoreElement.innerText = String(score);
  const nextElement = document.getElementById('next');
  nextElement.innerText = nextPiece;
};

export default render;
