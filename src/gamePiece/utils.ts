// determines if longest side in piece has an odd (like a "T"-piece)
// or even (like a "I"-piece) amount of blocks
export const isLongestSideEven = (coordinates: Array<Coordinate>): boolean => {
  const [min, max] = getMinMaxCoordinates(coordinates);
  const xDistance = max.x - min.x + 1;
  const yDistance = max.y - min.y + 1;
  const longestDistance = xDistance > yDistance ? xDistance : yDistance;
  const isLongestDistanceEven = longestDistance % 2 === 0;

  return isLongestDistanceEven;
};

export const getMinMaxCoordinates = (
  coordinates: Array<Coordinate>
): [Coordinate, Coordinate] => {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  coordinates.forEach(coordinate => {
    const { x, y } = coordinate;
    if (x > maxX) {
      maxX = x;
    }
    if (x < minX) {
      minX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
    if (y < minY) {
      minY = y;
    }
  });

  return [
    {
      x: minX,
      y: minY
    },
    {
      x: maxX,
      y: maxY
    }
  ];
};

export const transpose = (
  coordinates: Array<Coordinate>,
  origo: Coordinate,
  dx: number,
  dy: number
) => {
  return {
    coordinates: coordinates.map(coordinate => ({
      x: coordinate.x + dx,
      y: coordinate.y + dy
    })),
    origo: {
      x: origo.x + dx,
      y: origo.y + dy
    }
  };
};

// TODO setup unit test and refactor
export const getNextRotation = (
  args: RotationData & RotationOptions
): RotationData => {
  const { coordinates, origo, reverse } = args;
  // General rotation algorithm:
  // Keep track of origo and use relative positioning of all the pieces.
  // For each rotation: x2 = y1 * -1, y2 = x1

  let nextOrigo: Coordinate = {
    x: origo.x,
    y: origo.y
  };

  const needsTemporaryOrigoCross = isLongestSideEven(coordinates);

  let nextCoordinates: Coordinate[] = coordinates.map(coordinate => {
    const inTopLeftQuadrant =
      coordinate.x <= nextOrigo.x && coordinate.y <= nextOrigo.y;
    if (!needsTemporaryOrigoCross || inTopLeftQuadrant) {
      return {
        x: coordinate.x,
        y: coordinate.y
      };
    }

    return {
      x: coordinate.x > nextOrigo.x ? coordinate.x + 1 : coordinate.x,
      y: coordinate.y > nextOrigo.y ? coordinate.y + 1 : coordinate.y
    };
  });

  if (needsTemporaryOrigoCross) {
    nextOrigo = {
      x: nextOrigo.x + 1,
      y: nextOrigo.y + 1
    };
  }

  nextCoordinates = nextCoordinates.map(coordinate => {
    const dx1 = coordinate.x - nextOrigo.x;
    const dy1 = coordinate.y - nextOrigo.y;

    let dx2: number;
    let dy2: number;

    if (!reverse) {
      dx2 = dy1 * -1;
      dy2 = dx1;
    } else {
      dx2 = dy1;
      dy2 = dx1 * -1;
    }

    const x2 = nextOrigo.x + dx2;
    const y2 = nextOrigo.y + dy2;

    return {
      x: x2,
      y: y2
    };
  });

  // delete origo cross
  if (needsTemporaryOrigoCross) {
    nextOrigo = {
      x: nextOrigo.x - 1,
      y: nextOrigo.y - 1
    };

    nextCoordinates = nextCoordinates.map(coordinate => {
      if (coordinate.x <= nextOrigo.x && coordinate.y <= nextOrigo.y) {
        return coordinate;
      }
      return {
        x: coordinate.x > nextOrigo.x ? coordinate.x - 1 : coordinate.x,
        y: coordinate.y > nextOrigo.y ? coordinate.y - 1 : coordinate.y
      };
    });
  }

  return { coordinates: nextCoordinates, origo: nextOrigo };
};
