import { Knight } from '../Knight';
import { Position } from '../Position';

describe('Knight', () => {
  describe('#movablePositionsFrom', () => {
    const whiteKnight = new Knight('White');
    const blackKnight = new Knight('Black');

    it('should returns an array of positions', () => {
      expect(whiteKnight.movablePositionsFrom(new Position('b', 1))).toEqual([
        new Position('a', 3),
        new Position('c', 3),
        new Position('d', 2),
      ]);
      expect(whiteKnight.movablePositionsFrom(new Position('f', 3))).toEqual([
        new Position('d', 2),
        new Position('d', 4),
        new Position('e', 1),
        new Position('e', 5),
        new Position('g', 1),
        new Position('g', 5),
        new Position('h', 2),
        new Position('h', 4),
      ]);
      expect(blackKnight.movablePositionsFrom(new Position('g', 8))).toEqual([
        new Position('e', 7),
        new Position('f', 6),
        new Position('h', 6),
      ]);
    });
  });
});
