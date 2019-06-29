const render = ({ renderString, nextPiece }) => {
  let output = '';
  for (let i = 0; i < 14; i++) {
    output += '\r\n';
  }

  output += 'next:\n';
  output += nextPiece + '\n';
  output += '\n\n';
  output += renderString;

  console.log(output);
};

export default render;
