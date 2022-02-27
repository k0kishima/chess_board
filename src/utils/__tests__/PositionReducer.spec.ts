import { Board, King, Knight, Pawn, Position, Rook, Queen } from '@/entities';
import { RegularlyMovingPiecePositionReducer } from '../PositionReducer';

describe('RegularlyMovingPiecePositionReducer', () => {
  describe('#notMovablePosition', () => {
    describe('by white piece', () => {
      const piece = new Queen('White');
      const board = new Board();
      // TODO: 実際この駒組みはありえないけど後でどうするか考える
      // どうするか = テストの便宜上許容する or 実践的な棋譜での一場面を用いる
      board.put(new Position('b', 1), new Rook('Black'));
      board.put(new Position('b', 4), new Pawn('Black'));
      board.put(new Position('e', 1), new King('White'));
      board.put(new Position('e', 4), piece);
      board.put(new Position('e', 6), new Pawn('White'));
      board.put(new Position('g', 6), new Pawn('Black'));
      board.put(new Position('e', 7), new Pawn('Black'));
      board.put(new Position('f', 4), new Pawn('Black'));
      const offset = new Position('e', 4);
      const reducer = new RegularlyMovingPiecePositionReducer(
        board,
        piece,
        offset
      );

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.notMovablePosition().sort()).toEqual([
          new Position('a', 4),
          new Position('b', 1),
          new Position('b', 4),
          new Position('e', 1),
          new Position('e', 6),
          new Position('e', 7),
          new Position('e', 8),
          new Position('f', 4),
          new Position('g', 4),
          new Position('g', 6),
          new Position('h', 4),
          new Position('h', 7),
        ]);
      });
    });

    describe('by black piece', () => {
      const piece = new Queen('Black');
      const board = new Board();
      // ↗
      board.put(new Position('c', 4), new Pawn('White'));
      // →
      board.put(new Position('c', 5), new Rook('Black'));
      // ↘
      board.put(new Position('c', 6), new Pawn('Black'));
      // ↑
      board.put(new Position('d', 4), new Knight('Black'));
      board.put(new Position('d', 5), piece);
      // ↓
      board.put(new Position('d', 7), new King('Black'));
      // ↙
      board.put(new Position('e', 6), new Pawn('Black'));
      // ←
      board.put(new Position('f', 5), new Queen('White'));
      // ↖
      board.put(new Position('g', 2), new Pawn('White'));
      const offset = new Position('d', 5);
      const reducer = new RegularlyMovingPiecePositionReducer(
        board,
        piece,
        offset
      );

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.notMovablePosition().sort()).toEqual([
          new Position('a', 2),
          new Position('a', 5),
          new Position('a', 8),
          new Position('b', 3),
          new Position('b', 5),
          new Position('b', 7),
          new Position('c', 4),
          new Position('c', 5),
          new Position('c', 6),
          new Position('d', 1),
          new Position('d', 2),
          new Position('d', 3),
          new Position('d', 4),
          new Position('d', 7),
          new Position('d', 8),
          new Position('e', 6),
          new Position('f', 5),
          new Position('f', 7),
          new Position('g', 2),
          new Position('g', 5),
          new Position('g', 8),
          new Position('h', 1),
          new Position('h', 5),
        ]);
      });
    });
  });
});
