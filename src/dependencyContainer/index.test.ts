import DependencyContainer from '.';
import { IGameCharSelector } from '../config/types';
import { GAME_PIECE_TYPE } from '../gamePiece/enums';

describe('dependencyContainer', () => {
  it('throws when resolved before initialization', () => {
    const test = () => DependencyContainer.resolve('render');
    expect(test).toThrow();
  });

  it('throws when initialized with empty object', () => {
    const test = () => DependencyContainer.initialize({});
    expect(test).toThrow();
  });

  it('resolves initialized dependency', () => {
    const gameCharSelectorMock: IGameCharSelector = (char: GAME_PIECE_TYPE) => {
      return `it works: ${char}`;
    };
    DependencyContainer.initialize({
      gameCharSelector: gameCharSelectorMock
    });
    const resolvedDependency = DependencyContainer.resolve(
      'gameCharSelector'
    ) as IGameCharSelector;

    expect(resolvedDependency(GAME_PIECE_TYPE.BLOCK)).toEqual(
      `it works: ${GAME_PIECE_TYPE.BLOCK}`
    );
  });
});
