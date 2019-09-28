export interface Name {
  nextIndex: () => void;
  prevIndex: () => void;
  nextCharacter: () => void;
  prevCharacter: () => void;
  getName: () => string;
}

interface HighScore {
  save: (score: number) => void;
  load: () => number[];
  isHighScore: (score: number) => boolean;
}
