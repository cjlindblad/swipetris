import { HighScore } from './types';

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

const isHighScore = (score: number): boolean => {
  const highScore = loadHighScore();
  const minScore = Math.min(...highScore);
  return score > minScore;
};

const highScore: HighScore = {
  save: saveHighScore,
  load: loadHighScore,
  isHighScore
};

export default highScore;
