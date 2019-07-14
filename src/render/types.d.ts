interface IRender {
  (arg: IRenderParam): void;
}

interface IRenderParam {
  renderString: string;
  nextPiece: string;
  score: number;
}
