const loadHighScore = (): number[] => {
  return [13, 37, 13, 37];
};

const saveHighScore = (score: number): void => {
  // TODO not implemented
};

const highScore: HighScore = {
  save: saveHighScore,
  load: loadHighScore
};

export default highScore;
