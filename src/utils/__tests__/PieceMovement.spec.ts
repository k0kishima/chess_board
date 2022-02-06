import {
  frontPositions,
  rearPositions,
  leftPositions,
  rightPositions,
} from '../PieceMovement';
import { Position } from '@/entities';

describe('frontPositions', () => {
  describe('from the lowest rank', () => {
    const from = new Position('a', 1);
    it('should returns tuples of position and piece', () => {
      expect(frontPositions(from)).toEqual([
        new Position('a', 2),
        new Position('a', 3),
        new Position('a', 4),
        new Position('a', 5),
        new Position('a', 6),
        new Position('a', 7),
        new Position('a', 8),
      ]);
    });
  });

  describe('from in the middle rank', () => {
    const from = new Position('a', 4);
    it('should returns tuples of position and piece', () => {
      expect(frontPositions(from)).toEqual([
        new Position('a', 5),
        new Position('a', 6),
        new Position('a', 7),
        new Position('a', 8),
      ]);
    });
  });

  describe('from the highest rank', () => {
    const from = new Position('a', 8);
    it('should returns tuples of position and piece', () => {
      expect(frontPositions(from)).toEqual([]);
    });
  });
});

describe('rearPositions', () => {
  describe('from the lowest rank', () => {
    const from = new Position('a', 1);
    it('should returns tuples of position and piece', () => {
      expect(rearPositions(from)).toEqual([]);
    });
  });

  describe('from in the middle rank', () => {
    const from = new Position('a', 4);
    it('should returns tuples of position and piece', () => {
      expect(rearPositions(from)).toEqual([
        new Position('a', 1),
        new Position('a', 2),
        new Position('a', 3),
      ]);
    });
  });

  describe('from the highest rank', () => {
    const from = new Position('a', 8);
    it('should returns tuples of position and piece', () => {
      expect(rearPositions(from)).toEqual([
        new Position('a', 1),
        new Position('a', 2),
        new Position('a', 3),
        new Position('a', 4),
        new Position('a', 5),
        new Position('a', 6),
        new Position('a', 7),
      ]);
    });
  });
});

describe('leftPositions', () => {
  describe('from the smallest file', () => {
    const from = new Position('a', 1);
    it('should returns tuples of position and piece', () => {
      expect(leftPositions(from)).toEqual([]);
    });
  });

  describe('from in the middle rank', () => {
    const from = new Position('e', 1);
    it('should returns tuples of position and piece', () => {
      expect(leftPositions(from)).toEqual([
        new Position('a', 1),
        new Position('b', 1),
        new Position('c', 1),
        new Position('d', 1),
      ]);
    });
  });

  describe('from the biggest file', () => {
    const from = new Position('h', 1);
    it('should returns tuples of position and piece', () => {
      expect(leftPositions(from)).toEqual([
        new Position('a', 1),
        new Position('b', 1),
        new Position('c', 1),
        new Position('d', 1),
        new Position('e', 1),
        new Position('f', 1),
        new Position('g', 1),
      ]);
    });
  });
});

describe('rightPositions', () => {
  describe('from the smallest file', () => {
    const from = new Position('a', 1);
    it('should returns tuples of position and piece', () => {
      expect(rightPositions(from)).toEqual([
        new Position('b', 1),
        new Position('c', 1),
        new Position('d', 1),
        new Position('e', 1),
        new Position('f', 1),
        new Position('g', 1),
        new Position('h', 1),
      ]);
    });
  });

  describe('from in the middle rank', () => {
    const from = new Position('e', 1);
    it('should returns tuples of position and piece', () => {
      expect(rightPositions(from)).toEqual([
        new Position('f', 1),
        new Position('g', 1),
        new Position('h', 1),
      ]);
    });
  });

  describe('from the biggest file', () => {
    const from = new Position('h', 1);
    it('should returns tuples of position and piece', () => {
      expect(rightPositions(from)).toEqual([]);
    });
  });
});
