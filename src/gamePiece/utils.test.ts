import { getMinMaxCoordinates } from './utils';

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
