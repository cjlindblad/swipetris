interface HighScore {
  save: (score: number) => void;
  load: () => number[];
}