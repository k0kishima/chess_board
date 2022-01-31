import { Board, Pawn, Position } from '@/entities';

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

  describe('#movePiece', () => {
    it('should raise an error when a piece is not on the specified from position', () => {
      expect(() => {
        const board = new Board();
        board.movePiece(new Position('e', 2), new Position('e', 4));
      }).toThrowError(
        new Error('a piece is not on the specified from position.')
      );
    });

    it('should raise an error when a same color piece on the specified destination', () => {
      const board = new Board();
      board.put(new Position('e', 2), new Pawn('White'));
      board.put(new Position('e', 3), new Pawn('White'));
      expect(() => {
        board.movePiece(new Position('e', 2), new Position('e', 3));
      }).toThrowError(
        new Error('a same color piece is on the specified destination.')
      );
    });

    it('should raise an error when specified piece cannnot move to destination', () => {
      const board = new Board();
      board.put(new Position('e', 2), new Pawn('White'));
      expect(() => {
        board.movePiece(new Position('e', 2), new Position('e', 5));
      }).toThrowError(new Error('P cannot move or attack to e5 from e2.'));
    });

    it('should be able to move to blank destination by legal move', () => {
      const board = new Board();
      board.put(new Position('e', 2), new Pawn('White'));
      board.movePiece(new Position('e', 2), new Position('e', 3));
      // prettier-ignore
      expect(board.pieces).toEqual({
        a: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        b: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        c: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        d: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        e: { 1: null, 2: null, 3: new Pawn('White'), 4: null, 5: null, 6: null, 7: null, 8: null },
        f: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        g: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
        h: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      });
    });
  });
});
