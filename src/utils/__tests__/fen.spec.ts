import {
  createPieceColorFromSymbol,
  createPieceFromSymbol,
  parsePiecePlacement,
} from '../fen';
import { King, Pawn, Position } from '@/entities';

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

  describe('parsePiecePlacement', () => {
    describe('parse to valid format FEN', () => {
      it('should returns tuples of position and piece', () => {
        expect(parsePiecePlacement('8/8/8/2k5/4K3/5P2/8/8')).toEqual([
          [new Position('c', 4), new King('Black')],
          [new Position('e', 5), new King('White')],
          [new Position('f', 6), new Pawn('White')],
        ]);
      });
    });

    describe('parse to invalid format FEN', () => {
      it('should throws an error', () => {
        expect(() => {
          parsePiecePlacement(
            'rnbqkbnr/pp1ppppp/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R'
          );
        }).toThrow();
        expect(() => {
          parsePiecePlacement(
            'anbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
          );
        }).toThrow();
      });
    });
  });
});
