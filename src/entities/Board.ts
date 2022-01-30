import { FEN, File, PieceMoveResult, Rank } from '@/types';
import { FENParser } from '@/utils/FENParser';
import { Pawn } from './Pawn';
import { Piece } from './Piece';
import { Position } from './Position';

// NOTE:
// 本当はPositionかFileとRankのタプルをキーとしたPieceの配列でフラットに保持したいが、
// インデックスシグネチャのキーの型は文字列か数値に限定されるので代替案として以下の定義を採用
type Pieces = { [k in File]: { [k in Rank]: Piece | null } };

export class Board {
  pieces: Pieces;

  constructor(fen: FEN = '') {
    // prettier-ignore
    this.pieces = {
      a: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      b: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      c: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      d: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      e: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      f: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      g: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      h: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
    };
    if (fen) {
      const parser = new FENParser(fen);
      parser.parsePiecePlacement().map((tuple) => {
        const [position, piece] = tuple;
        this.put(position, piece);
      });
    }
  }

  put(position: Position, piece: Piece) {
    const column = this.pieces[position.file];
    if (!column) {
      throw Error(
        `the board does not have "${position.file}"" file. Perhaps it was initialized by wrong interface`
      );
    }
    column[position.rank] = piece;
  }

  movePiece(
    from: Position,
    destination: Position,
    validate = true
  ): PieceMoveResult {
    const pieceOnTheFrom = this.pieces[from.file][from.rank];
    if (pieceOnTheFrom === null) {
      throw new Error('a piece is not on the specified from position.');
    }

    const pieceOnTheDestination =
      this.pieces[destination.file][destination.rank];
    if (
      pieceOnTheDestination &&
      pieceOnTheFrom.color === pieceOnTheDestination.color
    ) {
      throw new Error('a same color piece is on the specified destination.');
    }

    const attackablePositionStrings = pieceOnTheFrom
      .attackablePositionsFrom(from)
      .map((p) => p.toString());
    const movablePositionStrings = pieceOnTheFrom
      .movablePositionsFrom(from)
      .map((p) => p.toString());
    if (
      validate &&
      !attackablePositionStrings.includes(destination.toString()) &&
      !movablePositionStrings.includes(destination.toString())
    ) {
      throw new Error(
        `${pieceOnTheFrom.toSymbol()} cannot move or attack to ${destination.toString()} from ${from.toString()}.`
      );
    }

    // FIXME:
    // 攻撃可能なマスに敵がいなくても移動できてしまう可能性があるので運用しながらデバッグする
    // 移動可能なマス即ち攻撃も可能なマスみたいな駒だといいけど、例えばポーンなんかはそうではないのでそういったケースだとバグ
    this.pieces[from.file][from.rank] = null;
    this.pieces[destination.file][destination.rank] = pieceOnTheFrom;

    return { isSuccess: true };
  }

  // NOTE:
  // これだと e2 -> e4 のとき e3 に何か駒があってもPositionを返してしまうが、
  // そのケースは #movePiece で例外を挙げるのでここではケアしない
  getEnPassantablePositionFromMove(
    from: Position,
    to: Position
  ): Position | null {
    const piece = this.pieces[from.file][from.rank];
    if (!piece) {
      return null;
    }
    if (!(piece instanceof Pawn)) {
      return null;
    }
    if (piece.color == 'White') {
      return from.rank == 2 && to.rank == 4 ? new Position(from.file, 3) : null;
    } else {
      return from.rank == 7 && to.rank == 5 ? new Position(from.file, 6) : null;
    }
  }
}
