// determines if longest side in piece has an odd (like a "T"-piece)
// or even (like a "I"-piece) amount of blocks
export const isLongestSideEven = coordinates => {
  const { minX, minY, maxX, maxY } = getMinMaxCoordinates(coordinates);
  const xDistance = maxX - minX + 1;
  const yDistance = maxY - minY + 1;
  const longestDistance = xDistance > yDistance ? xDistance : yDistance;
  const isLongestDistanceEven = longestDistance % 2 === 0;

  return isLongestDistanceEven;
};

export const getMinMaxCoordinates = coordinates => {
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

  return {
    minX,
    minY,
    maxX,
    maxY
  };
};
