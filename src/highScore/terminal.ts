let savedHighScore: number[] = [];

const loadHighScore = (): number[] => {
  return savedHighScore;
};

const saveHighScore = (score: number): void => {
  const highScore = savedHighScore;
  highScore.push(score);
  highScore.sort((a, b) => b - a);
  if (highScore.length > 10) {
    highScore.splice(10);
  }
  savedHighScore = highScore;
};

const highScore: HighScore = {
  save: saveHighScore,
  load: loadHighScore
};

export default highScore;
