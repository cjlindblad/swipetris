const saveHighScore = (score: number): void => {
  const HIGH_SCORE_KEY = 'high_scores';
  const serializedHighScore = localStorage.getItem(HIGH_SCORE_KEY);

  if (serializedHighScore === null) {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify([score]));
    return;
  }

  let highScores: number[] = JSON.parse(serializedHighScore);
  highScores.push(score);
  highScores.sort((a, b) => b - a);
  if (highScores.length > 10) {
    highScores.splice(10);
  }
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScores));
};

const highScore: HighScore = {
  save: saveHighScore
};

export default highScore;
