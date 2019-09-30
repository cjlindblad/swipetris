import { wrapModulo } from '../underdash';
import { Name } from './types';

export const createName = (): Name => {
  const name = ['A', 'A', 'A'];
  let activeIndex = 0;

  const nextIndex = (): void => {
    activeIndex = wrapModulo(activeIndex + 1, name.length);
  };

  const prevIndex = (): void => {
    activeIndex = wrapModulo(activeIndex - 1, name.length);
  };

  const nextCharacter = (): void => {
    if (name[activeIndex] === 'Z') {
      name[activeIndex] = 'A';
      return;
    }

    const activeCharCode = name[activeIndex].charCodeAt(0);
    name[activeIndex] = String.fromCharCode(activeCharCode + 1);
  };

  const prevCharacter = (): void => {
    if (name[activeIndex] === 'A') {
      name[activeIndex] = 'Z';
      return;
    }

    const activeCharCode = name[activeIndex].charCodeAt(0);
    name[activeIndex] = String.fromCharCode(activeCharCode - 1);
  };

  const getName = (): string => name.join('');

  const getIndex = (): number => activeIndex;

  return {
    nextIndex,
    prevIndex,
    nextCharacter,
    prevCharacter,
    getName,
    getIndex
  };
};
