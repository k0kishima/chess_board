import { reverseOf } from '../PieceMovement';

describe('reverseOf', () => {
  describe('for ↑', () => {
    it('returns ↓', () => {
      expect(reverseOf('↑')).toEqual('↓');
    });
  });

  describe('for ↗', () => {
    it('returns ↙', () => {
      expect(reverseOf('↗')).toEqual('↙');
    });
  });

  describe('for →', () => {
    it('returns ←', () => {
      expect(reverseOf('→')).toEqual('←');
    });
  });

  describe('for ↘', () => {
    it('returns ↖', () => {
      expect(reverseOf('↘')).toEqual('↖');
    });
  });

  describe('for ↓', () => {
    it('returns ↑', () => {
      expect(reverseOf('↓')).toEqual('↑');
    });
  });

  describe('for ↙', () => {
    it('returns ↗', () => {
      expect(reverseOf('↙')).toEqual('↗');
    });
  });

  describe('for ←', () => {
    it('returns →', () => {
      expect(reverseOf('←')).toEqual('→');
    });
  });

  describe('for ↖', () => {
    it('returns ↘', () => {
      expect(reverseOf('↖')).toEqual('↘');
    });
  });
});
