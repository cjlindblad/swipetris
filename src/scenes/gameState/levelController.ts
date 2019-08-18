import { BASE_GRAVITY_DELAY } from '../../config';

class LevelController {
  private _gravityInterval: number;
  private _level: number;

  public constructor() {
    this._level = 1;
    this._gravityInterval = BASE_GRAVITY_DELAY;
  }

  // TODO re-think public api (we should think in levels)
  public increaseLevel(): void {
    if (this._level < 10) {
      this._level += 1;
      this._gravityInterval *= 0.85; // very arbitrary.
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
