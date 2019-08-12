// some util functions

// eslint-disable-next-line @typescript-eslint/ban-types
export const isEmptyObject = (obj: Object): boolean =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

export const wrapModulo = (x: number, n: number): number => ((x % n) + n) % n;

// TODO refactor (has unit tests)
export const lineWrap = (str: string, maxLength: number): string => {
  const words = str.match(/\S+/g) || [];

  if (words.length === 0) {
    return '';
  }

  const lines: string[] = [];
  let nextLine = '';
  words.forEach((word, index) => {
    if (nextLine === '' && word.length <= maxLength) {
      nextLine = word;
    } else if (`${nextLine} ${word}`.length <= maxLength) {
      nextLine = `${nextLine} ${word}`;
    } else if (word.length > maxLength) {
      if (nextLine.length >= maxLength - 1) {
        lines.push(nextLine);
        nextLine = '';
      } else {
        nextLine += ' ';
      }
      word.split('').forEach(char => {
        if (`${nextLine}${char}`.length < maxLength) {
          nextLine += char;
        } else {
          lines.push(`${nextLine}-`);
          nextLine = char;
        }
      });
    } else {
      lines.push(nextLine);
      nextLine = word;
    }

    if (index === words.length - 1) {
      lines.push(nextLine);
    }
  });

  return lines.join('\n');
};
