import { createPieceColorFromSymbol, createPieceFromSymbol } from '../fen';
import { Pawn } from '@/entities';

describe('FEN utils', () => {
  describe('createPieceColorFromSymbol', () => {
    it('should returns a piece color', () => {
      expect(createPieceColorFromSymbol('P')).toEqual('White');
      expect(createPieceColorFromSymbol('p')).toEqual('Black');
    });
  });

  describe('createPieceFromSymbol', () => {
    it('should returns a piece color', () => {
      expect(createPieceFromSymbol('P')).toEqual(new Pawn('White'));
      expect(createPieceFromSymbol('p')).toEqual(new Pawn('Black'));
    });
  });
});
