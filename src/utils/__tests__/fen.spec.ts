import { createPieceColorFromSymbol } from '../fen';

describe('FEN utils', () => {
  describe('createPieceColorFromSymbol', () => {
    it('should returns a piece color', () => {
      expect(createPieceColorFromSymbol('P')).toEqual('White');
      expect(createPieceColorFromSymbol('p')).toEqual('Black');
    });
  });
});
