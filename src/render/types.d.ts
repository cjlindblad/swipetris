import { GameState } from '../scenes/gameState';

interface Render {
  (param: RenderParam, gameState?: GameState): void;
}

interface RenderParam {
  renderString: string;
  nextPiece: string;
  score: number;
}
