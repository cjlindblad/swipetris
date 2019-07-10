interface Coordinate {
  x: number;
  y: number;
}

interface RotationData {
  coordinates: Coordinate[];
  origo: Coordinate;
}

interface RotationOptions {
  reverse?: boolean;
}
