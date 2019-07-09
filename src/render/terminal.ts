const render = ({ renderString, nextPiece, score }) => {
  let output = '';
  for (let i = 0; i < 14; i++) {
    output += '\r\n';
  }

  output += `score: ${score}\n`;
  output += 'next:\n';
  output += nextPiece + '\n';
  output += '\n\n';
  output += renderString;
};

export default render;
