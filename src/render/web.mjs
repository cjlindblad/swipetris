export const render = ({ renderString, nextPiece }) => {
  const label = document.getElementById('input');
  label.innerText = renderString;
  const next = document.getElementById('next');
  next.innerText = nextPiece;
};

export default render;
