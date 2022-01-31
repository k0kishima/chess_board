import { FEN, File, GameContext, PieceMoveResult, Rank } from '@/types';
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
    gameContext: GameContext | null = null
  ): PieceMoveResult {
    try {
      // TODO: 実行順序の依存を持ってしまっている（駒の配置が変わる前にこれを呼び出さないといけない）ので修正
      const enPassantablePosition = this.getEnPassantablePositionFromMove(
        from,
        destination
      );
      if (!this._enPassant(from, destination, gameContext)) {
        const pieceOnTheDestination =
          this.pieces[destination.file][destination.rank];
        if (pieceOnTheDestination) {
          this._regularPieceAttack(from, destination);
        } else {
          this._regularPieceMove(from, destination);
        }
      }

      return {
        success: true,
        gameContext: {
          enPassantablePosition: enPassantablePosition,
        },
      };
    } catch (e) {
      if (e instanceof Error) {
        return { success: false, errorMessage: e.message };
      }
      throw e;
    }
  }

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
    // TODO: 途中に駒がある場合の考慮を追加
    if (piece.color == 'White') {
      return from.rank == 2 && to.rank == 4 ? new Position(from.file, 3) : null;
    } else {
      return from.rank == 7 && to.rank == 5 ? new Position(from.file, 6) : null;
    }
  }

  _getPieceAt(position: Position): Piece {
    const piece = this.pieces[position.file][position.rank];
    if (piece === null) {
      throw new Error('a piece is not on the specified from position.');
    }
    return piece;
  }

  _checkFriendlyFire(from: Position, destination: Position) {
    const pieceOnTheFrom = this.pieces[from.file][from.rank];
    const pieceOnTheDestination =
      this.pieces[destination.file][destination.rank];
    if (
      pieceOnTheFrom &&
      pieceOnTheDestination &&
      pieceOnTheFrom.color === pieceOnTheDestination.color
    ) {
      throw new Error('a same color piece is on the specified destination.');
    }
    return true;
  }

  _regularPieceMove(from: Position, destination: Position) {
    const pieceOnTheFrom = this._getPieceAt(from);

    const pieceOnTheDestination =
      this.pieces[destination.file][destination.rank];
    if (pieceOnTheDestination) {
      throw new Error(
        `${pieceOnTheFrom.toSymbol()} cannot move to ${destination.toString()} from ${from.toString()} because already other piece is in the position.`
      );
    }

    // TODO: 途中に駒がある場合の考慮を追加
    const movablePositionStrings = pieceOnTheFrom
      .movablePositionsFrom(from)
      .map((p) => p.toString());
    if (!movablePositionStrings.includes(destination.toString())) {
      throw new Error(
        `${pieceOnTheFrom.toSymbol()} cannot move to ${destination.toString()} from ${from.toString()}.`
      );
    }

    this.pieces[from.file][from.rank] = null;
    this.pieces[destination.file][destination.rank] = pieceOnTheFrom;

    return true;
  }

  _regularPieceAttack(from: Position, destination: Position) {
    this._checkFriendlyFire(from, destination);

    const pieceOnTheFrom = this._getPieceAt(from);
    const pieceOnTheDestination =
      this.pieces[destination.file][destination.rank];

    if (!pieceOnTheDestination) {
      throw new Error(
        `${pieceOnTheFrom.toSymbol()} cannot attack to ${destination.toString()} from ${from.toString()} because any piece is not in the position.`
      );
    }

    // TODO: 途中に駒がある場合の考慮を追加
    const attackablePositionStrings = pieceOnTheFrom
      .attackablePositionsFrom(from)
      .map((p) => p.toString());
    if (!attackablePositionStrings.includes(destination.toString())) {
      throw new Error(
        `${pieceOnTheFrom.toSymbol()} cannot attach to ${destination.toString()} from ${from.toString()}.`
      );
    }

    this.pieces[from.file][from.rank] = null;
    this.pieces[destination.file][destination.rank] = pieceOnTheFrom;

    return true;
  }

  _enPassant(
    from: Position,
    destination: Position,
    gameContext: GameContext | null
  ) {
    if (!gameContext || !gameContext.enPassantablePosition) {
      return false;
    }
    const piece = this.pieces[from.file][from.rank];
    if (!piece) {
      return false;
    }
    if (!(piece instanceof Pawn)) {
      return false;
    }
    if (
      destination.toString() !== gameContext.enPassantablePosition.toString()
    ) {
      return false;
    }

    this.pieces[from.file][from.rank] = null;
    this.pieces[destination.file][destination.rank] = piece;

    const willBeUnpassantPieceRank = piece.color === 'White' ? 5 : 4;
    this.pieces[destination.file][willBeUnpassantPieceRank] = null;

    return true;
  }
}
