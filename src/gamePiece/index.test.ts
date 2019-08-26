import { createGamePiece } from './index';
import { GAME_PIECE_TYPE } from './enums';
import DependencyContainer from '../dependencyContainer';
import { TEST_ENV, createGameCharSelector } from '../config';

// inject test dependencies
beforeAll((): void => {
  const dependencies = {
    gameCharSelector: createGameCharSelector(TEST_ENV)
  };
  DependencyContainer.initialize(dependencies);
});

describe('createGamePiece', (): void => {
  it('creates game piece without error', (): void => {
    const gamePiece = createGamePiece(GAME_PIECE_TYPE.S);
    expect(gamePiece).toBeDefined();
  });
  // TODO test game piece api
});
