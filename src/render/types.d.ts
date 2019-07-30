interface Render {
  (param: RenderParam): void;
}

interface RenderParam {
  renderString: string;
  nextPiece: string;
  score: number;
}
