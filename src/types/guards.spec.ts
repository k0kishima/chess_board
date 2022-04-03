import { isFenFormatString } from '@/types';

describe('isFenFormatString type guard', () => {
  describe('to assert valid format strings', () => {
    it('returns true', () => {
      expect(
        isFenFormatString(
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        )
      ).toBeTruthy();

      expect(
        isFenFormatString(
          'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
        )
      ).toBeTruthy();

      expect(
        isFenFormatString(
          'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2'
        )
      ).toBeTruthy();

      expect(
        isFenFormatString(
          'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
        )
      ).toBeTruthy();
    });
  });

  describe('to guard invalid format strings', () => {
    it('returns false', () => {
      expect(
        // invalid: piece placement part
        isFenFormatString(
          'rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        )
      ).toBeFalsy();

      expect(
        // invalid: active color
        isFenFormatString(
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR W KQkq - 0 1'
        )
      ).toBeFalsy();

      expect(
        // invalid: castling availability part
        isFenFormatString(
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w e1 - 0 1'
        )
      ).toBeFalsy();

      expect(
        // invalid: En passant target square in algebraic notation
        isFenFormatString(
          'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq i6 0 2'
        )
      ).toBeFalsy();

      expect(
        // invalid: halfmove clock part
        isFenFormatString(
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 51 1'
        )
      ).toBeFalsy();

      expect(
        // invalid: fullmove number part
        isFenFormatString(
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 a'
        )
      ).toBeFalsy();
    });
  });
});
