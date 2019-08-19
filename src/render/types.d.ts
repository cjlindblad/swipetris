import { GameState } from '../scenes/gameState';

interface Render {
  (param: GameStateRepresentation, gameState?: GameState): void;
}
