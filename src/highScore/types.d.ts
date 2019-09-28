export interface Name {
  nextIndex: () => void;
  prevIndex: () => void;
  nextCharacter: () => void;
  prevCharacter: () => void;
  getName: () => string;
}
