export interface Name {
  nextIndex: () => void;
  prevIndex: () => void;
  nextCharacter: () => void;
  prevCharacter: () => void;
  getName: () => string;
}

interface HighScore {
  save: (score: Score) => void;
  load: () => Score[];
  isHighScore: (value: number) => boolean;
}

interface Score {
  name: string;
  value: number;
}
