import { lineWrap } from '../underdash';
import { Render } from './types';
import { GameState } from '../scenes/gameState';

// TODO break this up
const render: Render = (param, gameState): void => {
  console.log('gameState: ', gameState);
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

  const addInfoWindow = (renderString: string, infoText: string): string => {
    const lines = renderString.split('\n');
    let longestLineLength = 0;
    lines.forEach(line => {
      if (line.length > longestLineLength) {
        longestLineLength = line.length;
      }
    });

    const MODAL_WIDTH = 20;
    const MODAL_X_OFFSET = longestLineLength / 2 - MODAL_WIDTH / 2;
    const MODAL_Y_OFFSET = 10;
    const VERTICAL_PADDING = 1;
    const HORIZONTAL_PADDING = 1;

    let wrappedText = lineWrap(
      infoText,
      MODAL_WIDTH - 2 - 2 * VERTICAL_PADDING
    );

    const lineCount = wrappedText.split('\n').length;

    wrappedText = wrappedText.split('\n').join('');

    const MODAL_HEIGHT = lineCount + 2 * HORIZONTAL_PADDING + 2;

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
      const isInVerticalPadding =
        index < MODAL_Y_OFFSET + VERTICAL_PADDING + 1 ||
        index >= MODAL_Y_OFFSET + MODAL_HEIGHT - 1 - VERTICAL_PADDING;
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
              const isInHorizontalPadding =
                i < MODAL_X_OFFSET + HORIZONTAL_PADDING + 1 ||
                i >= MODAL_X_OFFSET + MODAL_WIDTH - 1 - HORIZONTAL_PADDING;
              if (
                isInVerticalPadding ||
                isInHorizontalPadding ||
                wrappedText.length === 0
              ) {
                return ' ';
              }
              // TODO could optimize this by keeping an index counter
              // instead of creating n new strings
              const nextChar = wrappedText[0];
              wrappedText = wrappedText.substring(1);

              return nextChar;
            }
            return c;
          })
          .join('');
      }

      return line;
    });

    return result.join('\n');
  };

  let renderStringWithInfo = expandedRenderString;

  if (gameState && gameState === GameState.GameOver) {
    renderStringWithInfo = addInfoWindow(
      renderStringWithInfo,
      "Game over! Press 'r' to play again."
    );
  }

  const createDivider = (length: number): string => {
    let string = '+';
    for (let i = 0; i < length; i++) {
      string += '-';
    }
    string += '+';
    return string;
  }

  let output = '';
  output += `score: ${score}\n`;
  output += 'next:\n';
  output += nextPiece + '\n';
  output += '{{replace-me}}\n';
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
    if (line.includes('{{replace-me}}')) {
      display += `${createDivider(longestLine)}\n`
    } else {
      display += `|${line}${padding}|\n`;
    }
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
