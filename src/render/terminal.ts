// import { COLUMNS, ROWS } from '../config/index';

const render = (param: RenderParam): void => {
  const { renderString, nextPiece, score } = param;

  const expandSize = (input: string, factor: number): string => {
    const lines = input.split('\n');
    let result = '';
    lines.forEach(line => {
      let expandedLine = '';
      line.split('').forEach(char => {
        for (let i = 0; i < factor; i++) {
          expandedLine += char;
        }
      });
      expandedLine += '\n';
      for (let i = 0; i < factor; i++) {
        result += expandedLine;
      }
    });
    return result.replace(/\n$/, '');
  };

  const expandedRenderString = expandSize(renderString, 2);

  let output = '';
  output += `score: ${score}\n`;
  output += 'next:\n';
  output += nextPiece + '\n';
  output += '\n\n';
  output += expandedRenderString;
  const lines = output.split('\n');
  let longestLine = 0;
  lines.forEach(line => {
    if (line.length > longestLine) {
      longestLine = line.length;
    }
  });
  let display = '';
  display += '+';
  for (let i = 0; i < longestLine; i++) {
    display += '-';
  }
  display += '+\n';
  lines.forEach(line => {
    const lineLength = line.length;
    let padding = '';
    if (lineLength < longestLine) {
      for (let i = lineLength; i < longestLine; i++) {
        padding += ' ';
      }
    }
    display += `|${line}${padding}|\n`;
  });
  display += '+';
  for (let i = 0; i < longestLine; i++) {
    display += '-';
  }
  display += '+\n';
  process.stdout.write('\x1b[2J');
  process.stdout.write(display);
};

export default render;
