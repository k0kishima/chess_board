import { King } from '../King';
import { Position } from '../Position';

describe('King', () => {
  describe('.movablePositionsFrom', () => {
    const whiteKing = new King('White');
    const blackKing = new King('Black');

    it('should returns an array of positions', () => {
      expect(whiteKing.movablePositionsFrom(new Position('e', 1))).toEqual([
        new Position('d', 1),
        new Position('d', 2),
        new Position('e', 2),
        new Position('f', 1),
        new Position('f', 2),
      ]);
      expect(blackKing.movablePositionsFrom(new Position('e', 8))).toEqual([
        new Position('d', 7),
        new Position('d', 8),
        new Position('e', 7),
        new Position('f', 7),
        new Position('f', 8),
      ]);
      expect(whiteKing.movablePositionsFrom(new Position('a', 1))).toEqual([
        new Position('a', 2),
        new Position('b', 1),
        new Position('b', 2),
      ]);
      expect(blackKing.movablePositionsFrom(new Position('d', 5))).toEqual([
        new Position('c', 4),
        new Position('c', 5),
        new Position('c', 6),
        new Position('d', 4),
        new Position('d', 6),
        new Position('e', 4),
        new Position('e', 5),
        new Position('e', 6),
      ]);
    });
  });
});
