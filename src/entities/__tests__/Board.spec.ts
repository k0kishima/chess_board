import { Board } from '../Board';
import { Pawn } from '../Pawn';
import { Position } from '../Position';

describe('Board', () => {
  describe('#put', () => {
    it('should put a piece on specified position', () => {
      const board = new Board();
      board.put(new Position('a', 2), new Pawn('White'));
      board.put(new Position('h', 7), new Pawn('Black'));
      // prettier-ignore
      expect(board.pieces).toEqual({
        a: { 1: null, 2: new Pawn('White'), 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        b: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        c: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        d: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        e: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        f: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        g: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        h: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: new Pawn('Black'), 8: null },
      });
    });
  });
});
