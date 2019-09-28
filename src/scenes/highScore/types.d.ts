interface HighScore {
  save: (score: number) => void;
  load: () => number[];
  isHighScore: (score: number) => boolean;
}
