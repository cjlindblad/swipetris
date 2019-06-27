const render = ({ renderString, nextPieceChar }) => {
  let output = '';
  for (let i = 0; i < 14; i++) {
    output += '\r\n';
  }

  output += 'next: ' + nextPieceChar;
  output += '\n\n';
  output += renderString;

  console.log(output);
};

export default render;
