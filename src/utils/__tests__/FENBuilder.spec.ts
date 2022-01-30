import { FENBuilder } from '../FENBuilder';
import { Board, King, Pawn, Position } from '@/entities';

describe('FENBuilder', () => {
  describe('#_parseBoard', () => {
    it('should return FEN which was converted from pieces property of board object', () => {
      const board = new Board();
      board.put(new Position('c', 5), new King('Black'));
      board.put(new Position('e', 4), new King('White'));
      board.put(new Position('f', 3), new Pawn('White'));
      const builder = new FENBuilder();
      expect(builder._parseBoard(board)).toEqual('8/8/8/2k5/4K3/5P2/8/8');
    });
  });
});
