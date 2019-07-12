interface Coordinate {
  x: number;
  y: number;
}

interface CoordinateData {
  coordinates: Coordinate[];
  origo: Coordinate;
}

interface RotationOptions {
  reverse?: boolean;
}
