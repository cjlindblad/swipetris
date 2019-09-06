const getGravityDelay = (level: number): number =>
  Math.pow(0.8 - (level - 1) * 0.007, level - 1) * 1000;

class LevelController {
  private _gravityInterval: number;
  private _level: number;

  public constructor() {
    this._level = 1;
    this._gravityInterval = getGravityDelay(this._level);
  }

  // TODO re-think public api (we should think in levels)
  public increaseLevel(): void {
    if (this._level < 15) {
      this._level += 1;
      this._gravityInterval = getGravityDelay(this._level);
    }
  }

  public setLevel(level: number): void {
    if (level >= 1 && level <= 15) {
      this._level = level;
      this._gravityInterval = getGravityDelay(this._level);
    }
  }

  public getLevel(): number {
    return this._level;
  }

  public getGravityInterval(): number {
    return this._gravityInterval;
  }
}

export default LevelController;
