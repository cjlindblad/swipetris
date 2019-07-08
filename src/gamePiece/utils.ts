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
