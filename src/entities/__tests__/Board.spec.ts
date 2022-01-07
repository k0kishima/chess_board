import { Board, King, Pawn, Position } from '@/entities';

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

  describe('#toFEN', () => {
    it('should return FEN which was converted from pieces property', () => {
      const board = new Board();
      board.put(new Position('c', 5), new King('Black'));
      board.put(new Position('e', 4), new King('White'));
      board.put(new Position('f', 3), new Pawn('White'));
      expect(board.toFEN()).toEqual('8/8/8/2k5/4K3/5P2/8/8');
    });
  });
});
