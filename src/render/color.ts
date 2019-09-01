// TODO cache previously created colors(?)
class Color {
  private red: number;
  private green: number;
  private blue: number;
  private alpha?: number;

  // validators
  private withinColorRange = (colors: number[]): boolean => {
    colors.forEach(color => {
      if (color < 0 || color > 255) {
        return false;
      }
    });
    return true;
  };

  private withinAlphaRange = (alpha: number): boolean => {
    return alpha >= 0 && alpha <= 1;
  };

  public constructor(r: number, g: number, b: number, a: number = 1) {
    if (!this.withinColorRange([r, g, b]) || !this.withinAlphaRange(a)) {
      throw new Error('Invalid values supplied to Color constructor');
    }

    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }

  public toString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  public setAlpha(alpha: number): Color {
    if (!this.withinAlphaRange(alpha)) {
      throw new Error('Invalid alpha value supplied to setAlpha method');
    }
    return new Color(this.red, this.green, this.blue, alpha);
  }
}

export default Color;
