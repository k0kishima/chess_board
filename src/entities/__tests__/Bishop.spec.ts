import { Bishop } from '../Bishop';
import { Position } from '../Position';

describe('Bishop', () => {
  describe('.movablePositionsFrom', () => {
    const whiteBishop = new Bishop('White');
    const blackBishop = new Bishop('Black');

    it('should returns an array of positions', () => {
      expect(whiteBishop.movablePositionsFrom(new Position('c', 1))).toEqual([
        new Position('a', 3),
        new Position('b', 2),
        new Position('d', 2),
        new Position('e', 3),
        new Position('f', 4),
        new Position('g', 5),
        new Position('h', 6),
      ]);
      expect(blackBishop.movablePositionsFrom(new Position('f', 8))).toEqual([
        new Position('a', 3),
        new Position('b', 4),
        new Position('c', 5),
        new Position('d', 6),
        new Position('e', 7),
        new Position('g', 7),
        new Position('h', 6),
      ]);
    });
  });
});
