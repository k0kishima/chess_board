import { Position } from '../Position';

describe('Position', () => {
  describe('.all', () => {
    it('returns all positions', () => {
      expect(Position.all()).toEqual([
        new Position('a', 1),
        new Position('a', 2),
        new Position('a', 3),
        new Position('a', 4),
        new Position('a', 5),
        new Position('a', 6),
        new Position('a', 7),
        new Position('a', 8),
        new Position('b', 1),
        new Position('b', 2),
        new Position('b', 3),
        new Position('b', 4),
        new Position('b', 5),
        new Position('b', 6),
        new Position('b', 7),
        new Position('b', 8),
        new Position('c', 1),
        new Position('c', 2),
        new Position('c', 3),
        new Position('c', 4),
        new Position('c', 5),
        new Position('c', 6),
        new Position('c', 7),
        new Position('c', 8),
        new Position('d', 1),
        new Position('d', 2),
        new Position('d', 3),
        new Position('d', 4),
        new Position('d', 5),
        new Position('d', 6),
        new Position('d', 7),
        new Position('d', 8),
        new Position('e', 1),
        new Position('e', 2),
        new Position('e', 3),
        new Position('e', 4),
        new Position('e', 5),
        new Position('e', 6),
        new Position('e', 7),
        new Position('e', 8),
        new Position('f', 1),
        new Position('f', 2),
        new Position('f', 3),
        new Position('f', 4),
        new Position('f', 5),
        new Position('f', 6),
        new Position('f', 7),
        new Position('f', 8),
        new Position('g', 1),
        new Position('g', 2),
        new Position('g', 3),
        new Position('g', 4),
        new Position('g', 5),
        new Position('g', 6),
        new Position('g', 7),
        new Position('g', 8),
        new Position('h', 1),
        new Position('h', 2),
        new Position('h', 3),
        new Position('h', 4),
        new Position('h', 5),
        new Position('h', 6),
        new Position('h', 7),
        new Position('h', 8),
      ]);
    });
  });

  describe('.allOfFile', () => {
    it('returns same file positions of given position file', () => {
      expect(Position.allOfFile('a')).toEqual([
        new Position('a', 1),
        new Position('a', 2),
        new Position('a', 3),
        new Position('a', 4),
        new Position('a', 5),
        new Position('a', 6),
        new Position('a', 7),
        new Position('a', 8),
      ]);

      expect(Position.allOfFile('h')).toEqual([
        new Position('h', 1),
        new Position('h', 2),
        new Position('h', 3),
        new Position('h', 4),
        new Position('h', 5),
        new Position('h', 6),
        new Position('h', 7),
        new Position('h', 8),
      ]);
    });
  });

  describe('.allOfRank', () => {
    it('returns same rank positions of given position rank', () => {
      expect(Position.allOfRank(1)).toEqual([
        new Position('a', 1),
        new Position('b', 1),
        new Position('c', 1),
        new Position('d', 1),
        new Position('e', 1),
        new Position('f', 1),
        new Position('g', 1),
        new Position('h', 1),
      ]);

      expect(Position.allOfRank(8)).toEqual([
        new Position('a', 8),
        new Position('b', 8),
        new Position('c', 8),
        new Position('d', 8),
        new Position('e', 8),
        new Position('f', 8),
        new Position('g', 8),
        new Position('h', 8),
      ]);
    });
  });

  describe('.allDiagonalsFrom', () => {
    it('returns squares which are on diagonal from given position', () => {
      expect(Position.allDiagonalsFrom(new Position('a', 1))).toEqual([
        new Position('b', 2),
        new Position('c', 3),
        new Position('d', 4),
        new Position('e', 5),
        new Position('f', 6),
        new Position('g', 7),
        new Position('h', 8),
      ]);

      expect(Position.allDiagonalsFrom(new Position('e', 4))).toEqual([
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
      ]);
    });
  });

  describe('#distanceFrom', () => {
    it('returns distance of between positions', () => {
      const a1 = new Position('a', 1);
      expect(a1.distanceFrom(a1)).toEqual({
        rank: 0,
        file: 0,
      });
      expect(a1.distanceFrom(new Position('a', 8))).toEqual({
        rank: 7,
        file: 0,
      });
      expect(a1.distanceFrom(new Position('h', 8))).toEqual({
        rank: 7,
        file: 7,
      });

      const e4 = new Position('e', 4);
      expect(e4.distanceFrom(e4)).toEqual({
        rank: 0,
        file: 0,
      });
      expect(e4.distanceFrom(new Position('a', 1))).toEqual({
        rank: 3,
        file: 4,
      });
      expect(e4.distanceFrom(new Position('h', 8))).toEqual({
        rank: 4,
        file: 3,
      });
    });
  });
});