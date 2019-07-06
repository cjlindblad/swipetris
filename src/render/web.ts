export const render = ({ renderString, nextPiece, score }) => {
  const gameboardElement = document.getElementById('input');
  gameboardElement.innerText = renderString;
  const scoreElement = document.getElementById('score');
  scoreElement.innerText = score;
  const nextElement = document.getElementById('next');
  nextElement.innerText = nextPiece;
};

export default render;
