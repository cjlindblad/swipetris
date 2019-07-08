import { getMinMaxCoordinates } from './utils';

test('works when all coordinates are negative', () => {
  const coordinates: Array<Coordinate> = [
    {
      x: -1,
      y: -2
    },
    {
      x: -5,
      y: -6
    },
    {
      x: -3,
      y: -4
    }
  ];

  const [min, max] = getMinMaxCoordinates(coordinates);

  expect(min.x).toBe(-5);
  expect(min.y).toBe(-6);
  expect(max.x).toBe(-1);
  expect(max.y).toBe(-2);
});
