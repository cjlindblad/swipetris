interface GetGameStateRepresentation {
  (): GameStateRepresentation;
}

interface GameStateRepresentation {
  renderString?: string; // migrate away from this
  nextPiece: string;
  score: number;
  level: number;
  gameBoard?: string[][];
}
