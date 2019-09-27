const HIGH_SCORE_KEY = 'high_scores';

const saveHighScore = (score: number): void => {
  const serializedHighScore = localStorage.getItem(HIGH_SCORE_KEY);

  if (serializedHighScore === null) {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify([score]));
    return;
  }

  let highScore: number[] = JSON.parse(serializedHighScore);
  highScore.push(score);
  highScore.sort((a, b) => b - a);
  if (highScore.length > 10) {
    highScore.splice(10);
  }
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScore));
};

const loadHighScore = (): number[] => {
  const serializedHighScore = localStorage.getItem(HIGH_SCORE_KEY);

  if (serializedHighScore === null) {
    return [];
  }

  const highScore: number[] = JSON.parse(serializedHighScore);

  return highScore;
};

const isHighScore = (score: number): boolean => {
  const highScore = loadHighScore();
  const minScore = Math.min(...highScore);
  console.log('highScore', highScore);
  console.log('minScore', minScore);
  console.log('score', score);
  return score > minScore;
};

const highScore: HighScore = {
  save: saveHighScore,
  load: loadHighScore,
  isHighScore
};

export default highScore;
