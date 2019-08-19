import { lineWrap, expandString } from '../underdash';
import { Render } from './types';
import { GameState } from '../scenes/gameState';

const EXPAND_WIDTH = 4;
const EXPAND_HEIGHT = 2;

// TODO break this up
const render: Render = (param, gameState): void => {
  const { renderString, nextPiece, score, level } = param;

  const expandedRenderString = expandString(
    renderString,
    EXPAND_WIDTH,
    EXPAND_HEIGHT
  );

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

  const minHeight = (string: string, height: number): string => {
    const lines = string.split('\n').length;
    if (lines >= height) {
      return string;
    }

    const newlines = expandString('\n', height - lines, 1);
    return `${string}${newlines}`;
  };

  let output = '';
  output += `level: ${level}\n`;
  output += `score: ${score}\n`;
  output += 'next:\n';
  output += expandString(
    minHeight(`${nextPiece}\n`, 3),
    EXPAND_WIDTH,
    EXPAND_HEIGHT
  );
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
  display += expandString('-', longestLine, 1);
  display += '+\n';
  lines.forEach(line => {
    const lineLength = line.length;
    let padding = '';
    if (lineLength < longestLine) {
      padding = expandString(' ', longestLine - lineLength, 1);
    }
    if (line.includes('{{replace-me}}')) {
      display += `+${expandString('-', longestLine, 1)}+\n`;
    } else {
      display += `|${line}${padding}|\n`;
    }
  });
  display += '+';
  display += expandString('-', longestLine, 1);
  display += '+\n';
  process.stdout.write('\x1b[2J');
  process.stdout.write(display);
};

export default render;
