import { Rook } from '../Rook';
import { Position } from '../Position';

describe('Rook', () => {
  describe('#movablePositionsFrom', () => {
    const whiteRook = new Rook('White');
    const blackRook = new Rook('Black');

    it('should returns an array of positions', () => {
      expect(whiteRook.movablePositionsFrom(new Position('a', 1))).toEqual([
        new Position('a', 2),
        new Position('a', 3),
        new Position('a', 4),
        new Position('a', 5),
        new Position('a', 6),
        new Position('a', 7),
        new Position('a', 8),
        new Position('b', 1),
        new Position('c', 1),
        new Position('d', 1),
        new Position('e', 1),
        new Position('f', 1),
        new Position('g', 1),
        new Position('h', 1),
      ]);
      expect(blackRook.movablePositionsFrom(new Position('h', 8))).toEqual([
        new Position('h', 1),
        new Position('h', 2),
        new Position('h', 3),
        new Position('h', 4),
        new Position('h', 5),
        new Position('h', 6),
        new Position('h', 7),
        new Position('a', 8),
        new Position('b', 8),
        new Position('c', 8),
        new Position('d', 8),
        new Position('e', 8),
        new Position('f', 8),
        new Position('g', 8),
      ]);
    });
  });
});
