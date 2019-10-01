import { HighScore, Score } from './types';

let savedHighScore: Score[] = [];

const loadHighScore = (): Score[] => {
  return savedHighScore;
};

const saveHighScore = (score: Score): void => {
  const highScore = savedHighScore;
  highScore.push(score);
  highScore.sort((a, b) => b.value - a.value);
  if (highScore.length > 10) {
    highScore.splice(10);
  }
  savedHighScore = highScore;
};

const isHighScore = (score: number): boolean => {
  const highScore = loadHighScore();

  if (highScore.length < 10) {
    return true;
  }

  const minScore = Math.min(...highScore.map(e => e.value));
  return score > minScore;
};

const highScore: HighScore = {
  save: saveHighScore,
  load: loadHighScore,
  isHighScore
};

export default highScore;
