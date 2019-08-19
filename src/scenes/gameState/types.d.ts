interface GetGameStateRepresentation {
  (): GameStateRepresentation;
}

interface GameStateRepresentation {
  renderString: string;
  nextPiece: string;
  score: number;
  level: number;
}
