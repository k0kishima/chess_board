import { Pawn } from '@official-sashimi/chess-models';
import { FenPieceSymbolFactory } from './FenPieceSymbolFactory';

describe('FenPieceSymbolFactory', () => {
  describe('.create()', () => {
    it('returns a symbol of fen', () => {
      expect(FenPieceSymbolFactory.create(new Pawn('White'))).toEqual('P');
    });
  });
});
