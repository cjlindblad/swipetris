import { getMinMaxCoordinates, isLongestSideEven } from './utils';

describe('getMinMaxCoordinates', () => {
  it('works when all coordinates are negative', () => {
    const coordinates: Array<Coordinate> = [
      {
        x: -5,
        y: -4
      },
      {
        x: -1,
        y: -6
      },
      {
        x: -3,
        y: -2
      }
    ];

    const [min, max] = getMinMaxCoordinates(coordinates);

    expect(min.x).toBe(-5);
    expect(min.y).toBe(-6);
    expect(max.x).toBe(-1);
    expect(max.y).toBe(-2);
  });

  it('works when all coordinates are positive', () => {
    const coordinates: Array<Coordinate> = [
      {
        x: 1,
        y: 4
      },
      {
        x: 5,
        y: 2
      },
      {
        x: 3,
        y: 6
      }
    ];

    const [min, max] = getMinMaxCoordinates(coordinates);

    expect(min.x).toBe(1);
    expect(min.y).toBe(2);
    expect(max.x).toBe(5);
    expect(max.y).toBe(6);
  });

  it('works when coordinates are positive and negative', () => {
    const coordinates: Array<Coordinate> = [
      {
        x: 1,
        y: -4
      },
      {
        x: 5,
        y: -2
      },
      {
        x: 3,
        y: -6
      }
    ];

    const [min, max] = getMinMaxCoordinates(coordinates);

    expect(min.x).toBe(1);
    expect(min.y).toBe(-6);
    expect(max.x).toBe(5);
    expect(max.y).toBe(-2);
  });
});

describe('isLongestSideEven', () => {
  it('returns true when both sides are equally long and even', () => {
    const coordinates: Coordinate[] = [
      {
        x: 1,
        y: 11
      },
      {
        x: 4,
        y: 14
      },
      {
        x: 6,
        y: 16
      }
    ];

    expect(isLongestSideEven(coordinates)).toBe(true);
  });

  it('returns false when longest side is odd and shortest side is even', () => {
    const coordinates: Coordinate[] = [
      {
        x: 1,
        y: 11
      },
      {
        x: 4,
        y: 14
      },
      {
        x: 7,
        y: 16
      }
    ];

    expect(isLongestSideEven(coordinates)).toBe(false);
  });

  it('returns true when longest side is even and shortest side is odd', () => {
    const coordinates: Array<Coordinate> = [
      {
        x: 1,
        y: 11
      },
      {
        x: 4,
        y: 14
      },
      {
        x: 6,
        y: 15
      }
    ];

    expect(isLongestSideEven(coordinates)).toBe(true);
  });
});

describe('getNextRotation', () => {
  it('rotates I piece clockwise correctly', () => {
    // todo
  });
});
