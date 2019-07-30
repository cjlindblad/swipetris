import DependencyContainer from '.';
import { GameCharSelector } from '../config/types';
import { GAME_PIECE_TYPE } from '../gamePiece/enums';

describe('dependencyContainer', (): void => {
  it('throws when resolved before initialization', (): void => {
    const test = (): Render => DependencyContainer.resolve('render') as Render;
    expect(test).toThrow();
  });

  it('throws when initialized with empty object', (): void => {
    const test = (): void => DependencyContainer.initialize({});
    expect(test).toThrow();
  });

  it('resolves initialized dependency', (): void => {
    const gameCharSelectorMock: GameCharSelector = (
      char: GAME_PIECE_TYPE
    ): string => {
      return `it works: ${char}`;
    };
    DependencyContainer.initialize({
      gameCharSelector: gameCharSelectorMock
    });
    const resolvedDependency = DependencyContainer.resolve(
      'gameCharSelector'
    ) as GameCharSelector;

    expect(resolvedDependency(GAME_PIECE_TYPE.BLOCK)).toEqual(
      `it works: ${GAME_PIECE_TYPE.BLOCK}`
    );
  });
});
