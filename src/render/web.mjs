export const render = ({ renderString, nextPieceChar }) => {
  const label = document.getElementById('input');
  label.innerText = renderString;
  const next = document.getElementById('next');
  next.innerText = nextPieceChar;
};

export default render;
