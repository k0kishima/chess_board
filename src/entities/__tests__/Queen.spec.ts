import { Queen } from '../Queen';
import { Position } from '../Position';

describe('Queen', () => {
  describe('#movablePositionsFrom', () => {
    const whiteQueen = new Queen('White');
    const blackQueen = new Queen('Black');

    it('should returns an array of positions', () => {
      expect(
        whiteQueen.movablePositionsFrom(new Position('d', 1)).sort()
      ).toEqual(
        [
          new Position('d', 2),
          new Position('d', 3),
          new Position('d', 4),
          new Position('d', 5),
          new Position('d', 6),
          new Position('d', 7),
          new Position('d', 8),
          new Position('a', 1),
          new Position('b', 1),
          new Position('c', 1),
          new Position('e', 1),
          new Position('f', 1),
          new Position('g', 1),
          new Position('h', 1),
          new Position('a', 4),
          new Position('b', 3),
          new Position('c', 2),
          new Position('e', 2),
          new Position('f', 3),
          new Position('g', 4),
          new Position('h', 5),
        ].sort()
      );
      expect(
        blackQueen.movablePositionsFrom(new Position('e', 4)).sort()
      ).toEqual(
        [
          new Position('e', 1),
          new Position('e', 2),
          new Position('e', 3),
          new Position('e', 5),
          new Position('e', 6),
          new Position('e', 7),
          new Position('e', 8),
          new Position('a', 4),
          new Position('b', 4),
          new Position('c', 4),
          new Position('d', 4),
          new Position('f', 4),
          new Position('g', 4),
          new Position('h', 4),
          new Position('a', 8),
          new Position('b', 1),
          new Position('b', 7),
          new Position('c', 2),
          new Position('c', 6),
          new Position('d', 3),
          new Position('d', 5),
          new Position('f', 3),
          new Position('f', 5),
          new Position('g', 2),
          new Position('g', 6),
          new Position('h', 1),
          new Position('h', 7),
        ].sort()
      );
    });
  });
});
