import { createGamePiece } from './index';
import { GAME_PIECE_TYPE } from './enums';
import DependencyContainer from '../dependencyContainer';
import { TEST_ENV, createGameCharSelector } from '../config';

// inject test dependencies
beforeAll(() => {
  const dependencies = {
    gameCharSelector: createGameCharSelector(TEST_ENV)
  };
  DependencyContainer.initialize(dependencies);
});

describe('createGamePiece', () => {
  it('creates game piece without error', () => {
    const gamePiece = createGamePiece(GAME_PIECE_TYPE.S, {
      x: 0,
      y: 0
    });
    expect(gamePiece).toBeDefined();
  });

  // TODO test game piece api
});
