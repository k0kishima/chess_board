import { FENParser } from '../FENParser';
import { King, Pawn, Position } from '@/entities';

describe('FENParser', () => {
  describe('#parsePiecePlacement', () => {
    describe('parse to valid format FEN', () => {
      it('should returns tuples of position and piece', () => {
        const parser = new FENParser('8/8/8/2k5/4K3/5P2/8/8 w - - 2 18');
        expect(parser.parsePiecePlacement()).toEqual([
          [new Position('c', 5), new King('Black')],
          [new Position('e', 4), new King('White')],
          [new Position('f', 3), new Pawn('White')],
        ]);
      });
    });

    describe('parse to invalid format FEN', () => {
      it('should throws an error', () => {
        expect(() => {
          const parser = new FENParser(
            'rnbqkbnr/pp1ppppp/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R'
          );
          parser.parsePiecePlacement();
        }).toThrow();
        expect(() => {
          const parser = new FENParser(
            'anbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
          );
          parser.parsePiecePlacement();
        }).toThrow();
      });
    });
  });

  describe('#parseActiveColor', () => {
    describe('parse a valid format FEN', () => {
      describe('parse a symbol describing white', () => {
        const parser = new FENParser(
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        );
        it('should returns tuples of position and piece', () => {
          expect(parser.parseActiveColor()).toEqual('White');
        });
      });

      describe('parse a symbol describing black', () => {
        const parser = new FENParser(
          'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
        );
        it('should returns tuples of position and piece', () => {
          expect(parser.parseActiveColor()).toEqual('Black');
        });
      });
    });

    describe('parse a invalid format FEN', () => {
      it('should throws an error', () => {
        expect(() => {
          const parser = new FENParser(
            'rnbqkbnr/pp1ppppp/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R'
          );
          parser.parseActiveColor();
        }).toThrow();

        expect(() => {
          const parser = new FENParser(
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR W KQkq - 0 1'
          );
          parser.parseActiveColor();
        }).toThrow();
      });
    });
  });

  describe('#parseCastlingPosition', () => {
    describe('parse a valid format FEN', () => {
      describe('to parse a symbol describing all castling enable', () => {
        const parser = new FENParser(
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        );
        it('should returns array of tuples of position and piece', () => {
          // オブジェクト同士の比較だとアサーション通らないので文字列に変換されたものを比較
          expect(parser.parseCastlingPosition()).toEqual({
            b1: {
              destination: { file: 'c', rank: 1 },
              from: { file: 'a', rank: 1 },
            },
            b8: {
              destination: { file: 'c', rank: 8 },
              from: { file: 'a', rank: 8 },
            },
            g1: {
              destination: { file: 'f', rank: 1 },
              from: { file: 'h', rank: 1 },
            },
            g8: {
              destination: { file: 'g', rank: 8 },
              from: { file: 'h', rank: 8 },
            },
          });
        });
      });

      describe('to parse a symbol describing any castlings not enable', () => {
        const parser = new FENParser(
          'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b - e3 0 1'
        );
        it('should returns empty array', () => {
          expect(parser.parseCastlingPosition()).toEqual({});
        });
      });
    });

    describe('parse a invalid format FEN', () => {
      it('should throws an error', () => {
        expect(() => {
          const parser = new FENParser(
            'rnbqkbnr/pp1ppppp/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R'
          );
          parser.parseCastlingPosition();
        }).toThrow();

        expect(() => {
          const parser = new FENParser(
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w zzz - 0 1'
          );
          parser.parseCastlingPosition();
        }).toThrow();
      });
    });
  });

  describe('#_createPieceColorFromSymbol', () => {
    const parser = new FENParser(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    it('should returns a piece color', () => {
      expect(parser._createPieceColorFromSymbol('P')).toEqual('White');
      expect(parser._createPieceColorFromSymbol('p')).toEqual('Black');
    });
  });

  describe('#_createPieceFromSymbol', () => {
    const parser = new FENParser(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    it('should returns a piece color', () => {
      expect(parser._createPieceFromSymbol('P')).toEqual(new Pawn('White'));
      expect(parser._createPieceFromSymbol('p')).toEqual(new Pawn('Black'));
    });
  });
});
