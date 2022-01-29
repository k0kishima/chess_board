import {
  createPieceColorFromSymbol,
  createPieceFromSymbol,
  parsePiecePlacement,
  parseActiveColor,
  parseEnPassantablePosition,
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
          [new Position('c', 5), new King('Black')],
          [new Position('e', 4), new King('White')],
          [new Position('f', 3), new Pawn('White')],
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

  describe('parseActiveColor', () => {
    describe('parse a valid format FEN', () => {
      describe('parse a symbol describing white', () => {
        it('should returns tuples of position and piece', () => {
          expect(
            parseActiveColor(
              'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
            )
          ).toEqual('White');
        });
      });

      describe('parse a symbol describing black', () => {
        it('should returns tuples of position and piece', () => {
          expect(
            parseActiveColor(
              'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
            )
          ).toEqual('Black');
        });
      });
    });

    describe('parse a invalid format FEN', () => {
      it('should throws an error', () => {
        expect(() => {
          parseActiveColor('rnbqkbnr/pp1ppppp/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R');
        }).toThrow();

        expect(() => {
          parseActiveColor(
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR W KQkq - 0 1'
          );
        }).toThrow();
      });
    });
  });

  describe('parseEnPassantablePosition', () => {
    describe('parse a en passantable position', () => {
      it('should returns position', () => {
        expect(
          parseEnPassantablePosition(
            'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
          )
        ).toEqual(new Position('e', 3));
      });
    });

    describe('parse a placeholder', () => {
      it('should returns null', () => {
        expect(
          parseEnPassantablePosition(
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
          )
        ).toBeNull();
      });
    });

    xdescribe('parse a invalid character', () => {
      it('should returns null', () => {
        expect(
          parseEnPassantablePosition(
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq z 0 1'
          )
        ).toBeNull();
      });
    });
  });
});
