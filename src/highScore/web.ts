import { HighScore, Score } from './types';

const HIGH_SCORE_KEY = 'high_scores';

const saveHighScore = (score: Score): void => {
  const serializedHighScore = localStorage.getItem(HIGH_SCORE_KEY);

  if (serializedHighScore === null) {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify([score]));
    return;
  }

  let highScore: Score[] = JSON.parse(serializedHighScore);
  highScore.push(score);
  highScore.sort((a, b) => b.value - a.value);
  if (highScore.length > 10) {
    highScore.splice(10);
  }
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScore));
};

const loadHighScore = (): Score[] => {
  const serializedHighScore = localStorage.getItem(HIGH_SCORE_KEY);

  if (serializedHighScore === null) {
    return [];
  }

  const highScore: Score[] = JSON.parse(serializedHighScore);

  return highScore;
};

const isHighScore = (value: number): boolean => {
  const highScore = loadHighScore();

  if (highScore.length < 10) {
    return true;
  }

  const minScore = Math.min(...highScore.map(e => e.value));
  return value > minScore;
};

const highScore: HighScore = {
  save: saveHighScore,
  load: loadHighScore,
  isHighScore
};

export default highScore;
