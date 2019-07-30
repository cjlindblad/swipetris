import {
  getMinMaxCoordinates,
  isLongestSideEven,
  getNextRotation
} from './utils';

describe('getMinMaxCoordinates', (): void => {
  it('works when all coordinates are negative', (): void => {
    const coordinates: Coordinate[] = [
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

  it('works when all coordinates are positive', (): void => {
    const coordinates: Coordinate[] = [
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

  it('works when coordinates are positive and negative', (): void => {
    const coordinates: Coordinate[] = [
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

describe('isLongestSideEven', (): void => {
  it('returns true when both sides are equally long and even', (): void => {
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

  it('returns false when longest side is odd and shortest side is even', (): void => {
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

  it('returns true when longest side is even and shortest side is odd', (): void => {
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
        y: 15
      }
    ];

    expect(isLongestSideEven(coordinates)).toBe(true);
  });
});

describe('getNextRotation', (): void => {
  const I_PIECE: CoordinateData = {
    coordinates: [
      {
        x: 1,
        y: 2
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 3,
        y: 2
      },
      {
        x: 4,
        y: 2
      }
    ],
    origo: {
      x: 2,
      y: 2
    }
  };

  const S_PIECE: CoordinateData = {
    coordinates: [
      {
        x: 1,
        y: 2
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 3,
        y: 1
      }
    ],
    origo: {
      x: 2,
      y: 2
    }
  };

  it('rotates I piece clockwise correctly', (): void => {
    const rotation = getNextRotation({
      coordinates: I_PIECE.coordinates,
      origo: I_PIECE.origo,
      reverse: false
    });

    const expectedRotation: CoordinateData = {
      coordinates: [
        {
          x: 3,
          y: 1
        },
        {
          x: 3,
          y: 2
        },
        {
          x: 3,
          y: 3
        },
        {
          x: 3,
          y: 4
        }
      ],
      origo: {
        x: 2,
        y: 2
      }
    };

    expect(JSON.stringify(rotation)).toEqual(JSON.stringify(expectedRotation));
  });

  it('rotates I piece counter clockwise correctly', (): void => {
    const rotation = getNextRotation({
      coordinates: I_PIECE.coordinates,
      origo: I_PIECE.origo,
      reverse: true
    });

    const expectedRotation: CoordinateData = {
      coordinates: [
        {
          x: 2,
          y: 4
        },
        {
          x: 2,
          y: 3
        },
        {
          x: 2,
          y: 2
        },
        {
          x: 2,
          y: 1
        }
      ],
      origo: {
        x: 2,
        y: 2
      }
    };

    expect(JSON.stringify(rotation)).toEqual(JSON.stringify(expectedRotation));
  });

  it('rotates S piece clockwise correctly', (): void => {
    const rotation = getNextRotation({
      coordinates: S_PIECE.coordinates,
      origo: S_PIECE.origo,
      reverse: false
    });

    const expectedRotation: CoordinateData = {
      coordinates: [
        {
          x: 2,
          y: 1
        },
        {
          x: 2,
          y: 2
        },
        {
          x: 3,
          y: 2
        },
        {
          x: 3,
          y: 3
        }
      ],
      origo: {
        x: 2,
        y: 2
      }
    };

    expect(JSON.stringify(rotation)).toEqual(JSON.stringify(expectedRotation));
  });

  it('rotates S piece counter clockwise correctly', (): void => {
    const rotation = getNextRotation({
      coordinates: S_PIECE.coordinates,
      origo: S_PIECE.origo,
      reverse: true
    });

    const expectedRotation = {
      coordinates: [
        {
          x: 2,
          y: 3
        },
        {
          x: 2,
          y: 2
        },
        {
          x: 1,
          y: 2
        },
        {
          x: 1,
          y: 1
        }
      ],
      origo: {
        x: 2,
        y: 2
      }
    };

    expect(JSON.stringify(rotation)).toEqual(JSON.stringify(expectedRotation));
  });
});
