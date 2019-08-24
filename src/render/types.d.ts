import { GameState } from '../scenes/gameState';
import { GameStateRepresentation } from '../scenes/gameState/types';

interface Render {
  (param: GameStateRepresentation, gameState?: GameState): void;
}
