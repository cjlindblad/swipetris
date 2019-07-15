interface IRender {
  (param: IRenderParam): void;
}

interface IRenderParam {
  renderString: string;
  nextPiece: string;
  score: number;
}
