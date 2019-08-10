// TODO break this up
const render = (param: RenderParam): void => {
  const { renderString, nextPiece, score } = param;

  const expandSize = (
    input: string,
    widthFactor: number,
    heightFactor: number
  ): string => {
    const lines = input.split('\n');
    let result = '';
    lines.forEach(line => {
      let expandedLine = '';
      line.split('').forEach(char => {
        for (let i = 0; i < widthFactor; i++) {
          expandedLine += char;
        }
      });
      expandedLine += '\n';
      for (let i = 0; i < heightFactor; i++) {
        result += expandedLine;
      }
    });
    return result.replace(/\n$/, '');
  };

  const expandedRenderString = expandSize(renderString, 4, 2);

  const addInfoWindow = (renderString: string): string => {
    const lines = renderString.split('\n');
    let longestLineLength = 0;
    lines.forEach(line => {
      if (line.length > longestLineLength) {
        longestLineLength = line.length;
      }
    });

    const MODAL_WIDTH = 20;
    const MODAL_HEIGHT = 5;
    const MODAL_X_OFFSET = longestLineLength / 2 - MODAL_WIDTH / 2;
    const MODAL_Y_OFFSET = 10;

    const result = lines.map((line, index) => {
      const isFirstOrLastLine =
        index === MODAL_Y_OFFSET || index === MODAL_Y_OFFSET + MODAL_HEIGHT - 1;
      if (isFirstOrLastLine) {
        return line
          .split('')
          .map((c, i) => {
            if (
              i === MODAL_X_OFFSET ||
              i === MODAL_X_OFFSET + MODAL_WIDTH - 1
            ) {
              return '+';
            } else if (
              i >= MODAL_X_OFFSET &&
              i < MODAL_X_OFFSET + MODAL_WIDTH
            ) {
              return '-';
            }
            return c;
          })
          .join('');
      }

      const isInBetweenLine =
        index > MODAL_Y_OFFSET && index < MODAL_Y_OFFSET + MODAL_HEIGHT - 1;
      if (isInBetweenLine) {
        return line
          .split('')
          .map((c, i) => {
            if (
              i === MODAL_X_OFFSET ||
              i === MODAL_X_OFFSET + MODAL_WIDTH - 1
            ) {
              return '|';
            } else if (
              i >= MODAL_X_OFFSET &&
              i < MODAL_X_OFFSET + MODAL_WIDTH
            ) {
              return ' ';
            }
            return c;
          })
          .join('');
      }

      return line;
    });

    return result.join('\n');
  };

  const renderStringWithInfo = addInfoWindow(expandedRenderString);

  let output = '';
  output += `score: ${score}\n`;
  output += 'next:\n';
  output += nextPiece + '\n';
  output += '\n\n';
  output += renderStringWithInfo;
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
